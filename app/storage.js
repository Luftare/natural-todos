const STATE_KEY = "todo-app-state-key";

export const getPersistedState = () => {
  const jsonState = localStorage.getItem(STATE_KEY);

  return jsonState ? JSON.parse(jsonState) : null;
};

export const persistState = (state) => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};
