export const createTodo = (label) => (state) => {
  if (label === "") return { ...state };

  return {
    ...state,
    todos: [...state.todos, { label, done: false }],
  };
};

export const toggleItemDone = (itemToToggle) => (state) => {
  return {
    ...state,
    todos: state.todos.map((item) =>
      item === itemToToggle ? { ...item, done: !item.done } : item
    ),
  };
};

export const removeTodo = (itemToRemove) => (state) => {
  return {
    ...state,
    todos: state.todos.filter((item) => item !== itemToRemove),
  };
};
