import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import { vi } from "vitest";

// Mock data
type TestData = {
  id: number;
  name: string;
  email: string;
};

const mockData: TestData[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

describe("DataTable", () => {
  it("renders the table with data", () => {
    render(<DataTable columns={columns} data={mockData} />);

    // Check if data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("shows 'No results' when data is empty", () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("handles pagination", () => {
    const longData = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(<DataTable columns={columns} data={longData} />);

    // Check if pagination buttons are present
    const nextButton = screen.getByRole("button", { name: /next/i });
    const previousButton = screen.getByRole("button", { name: /previous/i });

    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toBeDisabled();

    // Navigate to next page
    fireEvent.click(nextButton);
    expect(previousButton).not.toBeDisabled();
  });

  it("handles search functionality", () => {
    render(<DataTable columns={columns} data={mockData} searchKey="name" />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    // Check if filtering works
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("handles sorting", () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>Name</button>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ];

    render(<DataTable columns={sortableColumns} data={mockData} />);

    const sortButton = screen.getByRole("button", { name: /name/i });
    fireEvent.click(sortButton);

    // Check if sorting works (Jane should come before John)
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Jane Smith");
  });
});
