import { render } from "/render.js";
import { getPersistedState } from "/storage.js";

const getState = () => {
  const persistedState = getPersistedState();

  const initialState = {
    todos: [],
  };

  return persistedState ?? initialState;
};

render(getState());
