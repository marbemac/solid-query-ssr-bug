import { renderTags } from "@solidjs/meta";
import type { RouterOutput } from "@solidjs/router";
import { generateHydrationScript, renderToStringAsync } from "solid-js/web";

import type { TagDescription } from "./Server";
import { Server } from "./Server";
import { createQueryClient } from "./utils/query-client";

export async function render(
  url: string,
  out?: RouterOutput | Record<string, unknown>
) {
  const tags: TagDescription[] = [];

  const queryClient = createQueryClient();

  const body = await renderToStringAsync(() => (
    <Server tags={tags} url={url} out={out} queryClient={queryClient} />
  ));

  const hydration = generateHydrationScript();
  const head = renderTags(tags);

  // const dehydratedState = dehydrate(queryClient);
  // window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
  // queryClient.clear();

  return {
    head,
    hydration,
    body,
  };
}
