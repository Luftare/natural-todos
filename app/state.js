export const createTodo = (label) => (state) => {
  if (label === "") return { ...state };

  return {
    ...state,
    todos: [...state.todos, { label }],
  };
};
