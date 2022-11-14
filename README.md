# Solid Query SSR Bug

This app leverages `vite-plugin-solid`, `solid-router`, and `renderToStringAsync` to do SSR.

It demonstrates how `solid-query` does not seem to work with suspense in SSR, while solid's own `createResource` does work.

To run it:

```bash
yarn
yarn dev

# open http://localhost:3016
```

Turn off javascript and note how http://localhost:3016/solid-resource works, but http://localhost:3016/solid-query does not (it seems to hang?).

These two routes can be found in `client/pages`.
