import { createResource, For, Suspense } from "solid-js";

import { fetchTodos } from "../utils/api";

export default function SolidResource() {
  return (
    <>
      <h1>Solid Resource</h1>
      <Suspense fallback={<p>Solid resource suspense fallback...</p>}>
        <Todos />
      </Suspense>
    </>
  );
}

const Todos = () => {
  const [todos] = createResource(fetchTodos);

  return (
    <ol>
      <For each={todos()} fallback={<li>No todos...</li>}>
        {(todo) => <li>{todo.name}</li>}
      </For>
    </ol>
  );
};
