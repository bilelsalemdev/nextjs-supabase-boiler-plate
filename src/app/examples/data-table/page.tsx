"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Button variant="ghost" onClick={() => console.log(user)}>
          View Details
        </Button>
      );
    },
  },
];

export default function DataTableExample() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Replace with your actual API call
      return [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "User",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "Editor",
        },
      ];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      <DataTable columns={columns} data={users} searchKey="name" />
    </div>
  );
}
