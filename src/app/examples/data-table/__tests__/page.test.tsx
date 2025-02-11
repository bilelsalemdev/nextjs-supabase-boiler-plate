import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTableExample from "../page";
import { vi } from "vitest";

// Create a new QueryClient for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("DataTableExample", () => {
  it("renders loading state initially", () => {
    render(<DataTableExample />, { wrapper });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders table with data after loading", async () => {
    render(<DataTableExample />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  it("renders action buttons for each row", async () => {
    render(<DataTableExample />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const viewButtons = screen.getAllByText("View Details");
    expect(viewButtons).toHaveLength(3);
  });

  it("renders sort buttons in header", async () => {
    render(<DataTableExample />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /name/i })).toBeInTheDocument();
  });

  it("renders search input", async () => {
    render(<DataTableExample />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
