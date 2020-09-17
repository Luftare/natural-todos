import { createTodo, removeTodo, toggleItemDone } from "../app/state";

const initState = {
  todos: [],
};

const stateWithUnfinishedItem = {
  ...initState,
  todos: [{ label: "something", done: false }],
};

const initStateDeepCopy = JSON.parse(JSON.stringify(initState));

const expectOriginalStateToBeUnchanged = () => {
  expect(initState).toEqual(initStateDeepCopy);
};

describe("state", () => {
  it("should not create item if new todo label is empty string and return copied state", () => {
    const updatedState = createTodo("")(initState);

    expect(updatedState.todos).toHaveLength(0);
    expect(updatedState).not.toBe(initState);
    expectOriginalStateToBeUnchanged();
  });

  it("given a new todo label, should immutably create a todo item", () => {
    const updatedState = createTodo("something")(initState);

    expect(updatedState.todos).toContainEqual({
      label: "something",
      done: false,
    });
    expect(updatedState).not.toBe(initState);
    expectOriginalStateToBeUnchanged();
  });

  it("should be able to immutably toggle item done status", () => {
    const onceToggledState = toggleItemDone(stateWithUnfinishedItem.todos[0])(
      stateWithUnfinishedItem
    );
    const twiceToggledState = toggleItemDone(onceToggledState.todos[0])(
      onceToggledState
    );

    expect(onceToggledState.todos[0].done).toBe(true);
    expect(twiceToggledState.todos[0].done).toBe(false);
    expect(onceToggledState).not.toBe(stateWithUnfinishedItem);
    expectOriginalStateToBeUnchanged();
  });

  it("should be able to immutably remove items", () => {
    const updatedState = removeTodo(stateWithUnfinishedItem.todos[0])(
      stateWithUnfinishedItem
    );

    expect(updatedState.todos).toHaveLength(0);
    expect(updatedState).not.toBe(stateWithUnfinishedItem);
    expectOriginalStateToBeUnchanged();
  });
});
