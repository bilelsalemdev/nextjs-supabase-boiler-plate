"use client";

import { useTodoStore } from "@/store/use-todo-store";
import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Card } from "@/components/ui/card";

export function TodoList() {
  const { todos, isLoading, error } = useTodoStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <TodoForm />
      <div className="space-y-2 mt-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </Card>
  );
} 