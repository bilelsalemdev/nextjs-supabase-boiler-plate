import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../todo-list";
import { useTodoStore } from "@/store/use-todo-store";

describe("TodoList", () => {
  beforeEach(() => {
    useTodoStore.getState().todos = [];
  });

  it("renders empty state", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New todo")).toBeInTheDocument();
  });

  it("toggles a todo", () => {
    useTodoStore.getState().addTodo("Test todo");
    
    render(<TodoList />);
    
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
}); 