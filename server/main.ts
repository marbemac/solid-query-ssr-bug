// Adapted from https://github.com/vitejs/vite/blob/main/playground/ssr-react/server.js

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import type { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest =
  process.env["NODE_ENV"] === "test" || !!process.env["VITE_TEST_BUILD"];

export async function createServer(
  root = process.cwd(),
  isProd = process.env["NODE_ENV"] === "production"
) {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("client/index.html"), "utf-8")
    : "";

  const app = express().disable("x-powered-by");

  let vite: ViteDevServer;

  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      appType: "custom",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("../index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (
          await vite.ssrLoadModule(resolve("../client/entry.server.tsx"))
        )["render"];
      } else {
        template = indexProd;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore sometimes, such as in dev, dist won't be built, that's ok
        render = (await import("./server/entry.server.js"))["render"];
      }

      const context: Record<string, string> = {};
      const appHtml = await render(url, context);

      if (context["url"]) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context["url"]);
      }

      const html = template
        .replace(`<!--ssr-head-outlet-->`, appHtml.head + appHtml.hydration)
        .replace(`<!--ssr-body-outlet-->`, appHtml.body);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err: any) {
      !isProd && vite.ssrFixStacktrace(err);

      console.error("Error handling request:", err);
      res.status(500);

      // Don't leak data in prod
      if (!isProd) {
        // deepcode ignore XSS: url only used in dev, deepcode ignore ServerLeak: not done in prod
        res.end(err.stack);
      } else {
        // TODO: Send back a nice error page
      }
    }
  });

  return { app };
}

const port = Number(process.env["PORT"] || 3016);

if (!isTest) {
  createServer()
    .then(({ app }) =>
      app.listen(port, () => {
        console.log(`Frontend is listening on http://localhost:${port}`);
      })
    )
    .catch((err) => {
      console.error("Error Starting Server:\n", err);
      process.exit(1);
    });
}
