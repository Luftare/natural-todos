import { render } from "/render.js";

const getInitState = () => ({
  todos: [],
});

const initState = getInitState();

render(initState);
