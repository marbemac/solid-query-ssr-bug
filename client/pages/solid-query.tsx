import { createQuery } from "@tanstack/solid-query";
import { fetchTodos } from "../utils/api";
import { For, Suspense } from "solid-js";

export default function SolidQuery() {
  return (
    <>
      <h1>Solid Query</h1>
      <Suspense fallback={<p>Solid query suspense fallback...</p>}>
        <Todos />
      </Suspense>
    </>
  );
}

const Todos = () => {
  const query = createQuery(() => ["todos"], fetchTodos, { suspense: true });

  return (
    <ol>
      <For each={query.data} fallback={<li>No todos...</li>}>
        {(todo) => <li>{todo.name}</li>}
      </For>
    </ol>
  );
};
