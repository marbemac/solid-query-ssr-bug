import { MetaProvider } from "@solidjs/meta";
import type { RouteDataFunc, RouterOutput } from "@solidjs/router";
import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

import { App } from "./App";

export interface TagDescription {
  tag: string;
  props: Record<string, unknown>;
  id: string;
  name?: string;
  ref?: Element;
}

export interface ServerProps {
  tags: TagDescription[];
  url: string;
  queryClient: QueryClient;
  out?: object | RouterOutput | Record<string, unknown>;
  data?: RouteDataFunc;
}

export const Server: Component<ServerProps> = (props) => {
  return (
    <MetaProvider tags={props.tags}>
      <QueryClientProvider client={props.queryClient}>
        <Router url={props.url} out={props.out} data={props.data}>
          <App />
        </Router>
      </QueryClientProvider>
    </MetaProvider>
  );
};
