import { persistState } from "/storage.js";
import { createTodo, removeTodo, toggleItemDone } from "/state.js";
import { onAppear, on } from "/DOM.js";

const rootElement = document.querySelector(".app");

const renderTodoList = (state, handleItemToggleDone, handleRemoveTodo) => `
  <ul class="todo-list">
    ${state.todos
      .map(
        (item) =>
          `<li class="todo-list__item" aria-label="${
            item.done ? "Completed" : "Uncompleted"
          } todo item">
            <label ${item.done && 'style="text-decoration: line-through;"'}>
              <input
                type="checkbox"
                aria-label="Toggle completed"
                ${item.done && "checked"}
                ${on("change", handleItemToggleDone(item))}
              /> 

              ${item.label}
            </label>

            <button
              class="todo-list__delete-item"
              aria-label="Remove"
              ${on("click", handleRemoveTodo(item))}
            >
              X
            </button>
          </li>`
      )
      .join("")}
  </ul>
`;

const renderEmptyTodoListPlaceholder = () =>
  `<p class="todo-list__empty-placeholder">Nothing to do yet.</p>`;

export const render = (state) => {
  persistState(state);

  let newTodoLabel = "";

  const handleTodoFieldInput = (e) => {
    newTodoLabel = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    render(createTodo(newTodoLabel)(state));
  };

  const handleItemToggleDone = (item) => () => {
    render(toggleItemDone(item)(state));
  };

  const handleRemoveTodo = (item) => () => {
    render(removeTodo(item)(state));
  };

  rootElement.innerHTML = `
    <form
      class="todo-form"
      ${on("submit", handleSubmit)}
    >
      <input
        class="todo-form__text-input"
        placeholder="What to do today?"
        aria-label="New todo item text field"
        value="${newTodoLabel}"
        ${on("input", handleTodoFieldInput)}
        ${onAppear((element) => element.focus())}
      />

      <input
        class="todo-form__submit-button"
        type="submit"
        value="Add"
      />
    </form>
    
    ${
      state.todos.length > 0
        ? renderTodoList(state, handleItemToggleDone, handleRemoveTodo)
        : renderEmptyTodoListPlaceholder()
    }
  `;
};
