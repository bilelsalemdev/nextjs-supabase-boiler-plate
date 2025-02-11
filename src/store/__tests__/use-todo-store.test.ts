import { renderHook, act } from "@testing-library/react";
import { useTodoStore } from "../use-todo-store";

describe("useTodoStore", () => {
  beforeEach(() => {
    useTodoStore.getState().todos = [];
  });

  it("should add a todo", () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo("Test todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("Test todo");
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should toggle a todo", () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo("Test todo");
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  it("should remove a todo", () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo("Test todo");
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.removeTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
  });
}); 