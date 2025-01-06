import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BookService } from "../services/BookService";
import Dashboard from "./Dashboard";

jest.mock("../services/BookService");

describe("Dashboard Component", () => {
  const mockBooks = [
    {
      id: 1,
      title: "Test Book 1",
      author: "Author 1",
      genre: "Genre 1",
      isbn: "1234567890",
      available: true,
    },
    {
      id: 2,
      title: "Test Book 2",
      author: "Author 2",
      genre: "Genre 2",
      isbn: "0987654321",
      available: false,
      borrowerName: "Borrower 1",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (BookService.getBooks as jest.Mock).mockResolvedValueOnce({
      data: mockBooks, pagination: { page: 1, perPage: 2, totalResultCount: 2}
    });
  });

  test("renders BookFilter, BookCard components and NoBooksMessage when no books are available", async () => {
    render(<Dashboard />);

    // Check if BookFilter is rendered
    await waitFor(() => {
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/availability/i)).toBeInTheDocument();
    });

    // Wait for BookCards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
      expect(screen.getByText("Test Book 2")).toBeInTheDocument();
    });

    // Check if NoBooksMessage is rendered when no books are available
    (BookService.getBooks as jest.Mock).mockResolvedValueOnce({
      data: [], pagination: { page: 1, perPage: 2, totalResultCount: 0}
    });
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText("No Books Found")).toBeInTheDocument();
    });
  });

  test("opens and closes BorrowBookModal", async () => {
    render(<Dashboard />);

    // Wait for BookCards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
    });

    // Open BorrowBookModal
    fireEvent.click(screen.getByText("BORROW"));

    // Check if BorrowBookModal is rendered
    expect(screen.getByText("Borrow Book")).toBeInTheDocument();

    // Close BorrowBookModal
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Borrow Book")).not.toBeInTheDocument();
    });
  });

  test("opens and closes DeleteBookModal", async () => {
    render(<Dashboard />);

    // Wait for BookCards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
    });

    // Open DeleteBookModal
    fireEvent.click(screen.getAllByText("DELETE")[0]);

    // Check if DeleteBookModal is rendered
    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();

    // Close DeleteBookModal
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
    });
  });

  test("opens and closes EditBookModal", async () => {
    render(<Dashboard />);

    // Wait for BookCards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
    });

    // Open EditBookModal
    fireEvent.click(screen.getAllByText("EDIT")[0]);

    // Check if EditBookModal is rendered
    expect(screen.getByText("Edit Book")).toBeInTheDocument();

    
    // Close EditBookModal by pressing escape
    fireEvent.keyDown(screen.getByText("Edit Book"), { key: "Escape", code: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Edit Book")).not.toBeInTheDocument();
    });
  });

  test("opens and closes ReturnBookModal", async () => {
    render(<Dashboard />);

    // Wait for BookCards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test Book 2")).toBeInTheDocument();
    });

    // Open ReturnBookModal
    fireEvent.click(screen.getByText("RETURN"));

    // Check if ReturnBookModal is rendered
    expect(screen.getByText("Return Book")).toBeInTheDocument();

    // Close ReturnBookModal
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Return Book")).not.toBeInTheDocument();
    });
  });
});