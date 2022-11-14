export const fetchTodos = async () => {
  await new Promise((r) => setTimeout(r, 500));

  return [
    {
      name: "todo #1",
    },
    {
      name: "todo #2",
    },
  ];
};
