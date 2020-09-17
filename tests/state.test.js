import { createTodo } from "../app/state";

const initState = {
  todos: [],
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

    expect(updatedState.todos).toContainEqual({ label: "something" });
    expect(updatedState).not.toBe(initState);
    expectOriginalStateToBeUnchanged();
  });
});
