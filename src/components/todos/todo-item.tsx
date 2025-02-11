"use client";

import { Todo, useTodoStore } from "@/store/use-todo-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo } = useTodoStore();

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
          id={todo.id}
        />
        <label
          htmlFor={todo.id}
          className={`${todo.completed ? "line-through text-gray-500" : ""}`}
        >
          {todo.title}
        </label>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
} 