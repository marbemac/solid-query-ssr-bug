import { Title } from "@solidjs/meta";
import { NavLink, useRoutes } from "@solidjs/router";

import { routes } from "./routes";

export const App = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <Title>Solid Query SSR Playground</Title>

      <div>
        <h1>Solid Query SSR Playground</h1>
        <ul>
          <li>
            <NavLink href="solid-query">Solid Query</NavLink>
          </li>
          <li>
            <NavLink href="solid-resource">Solid Resource</NavLink>
          </li>
        </ul>
      </div>

      <Routes />
    </>
  );
};
