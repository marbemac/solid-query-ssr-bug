import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

import { App } from "./App";
import { createQueryClient } from "./utils/query-client";

const queryClient = createQueryClient();

export const Browser: Component = () => {
  return (
    <MetaProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </MetaProvider>
  );
};
