import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Book } from "../models";
import { BookService } from "../services/BookService";
import BorrowedBooks from "./BorrowedBooks";

jest.mock("../services/BookService");

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    borrower_name: "John Doe",
    borrower_email: "john.doe@example.com",
    borrower_phone: "1234567890",
    borrow_date: "2023-12-01",
    available: false,
    genre: "Action",
    isbn: "",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
    borrower_name: "Jane Smith",
    borrower_email: "jane.smith@example.com",
    borrower_phone: "0987654321",
    borrow_date: "2023-12-05",
    available: false,
    genre: "Action",
    isbn: "",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Author 3",
    borrower_name: "Alice cooper",
    borrower_email: "alice.cooper@example.com",
    borrower_phone: "4567890123",
    borrow_date: "2023-12-06",
    available: false,
    genre: "Action",
    isbn: "",
  },
  {
    id: 4,
    title: "Book 4",
    author: "Author 4",
    borrower_name: "Jane Smith",
    borrower_email: "jane.smith@example.com",
    borrower_phone: "0987654321",
    borrow_date: "2023-12-07",
    available: false,
    genre: "Action",
    isbn: "",
  },
  {
    id: 5,
    title: "Book 5",
    author: "Author 5",
    borrower_name: "Gerta Green",
    borrower_email: "gerta.green@example.com",
    borrower_phone: "65432109",
    borrow_date: "2023-12-08",
    available: false,
    genre: "Action",
    isbn: "",
  },
  {
    id: 6,
    title: "Book 6",
    author: "Author 6",
    borrower_name: "Jane Smith",
    borrower_email: "jane.smith@example.com",
    borrower_phone: "0987654321",
    borrow_date: "2023-12-09",
    available: false,
    genre: "Action",
    isbn: "",
  },
];

describe("BorrowedBooks Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty state when no books are borrowed", async () => {
    (BookService.getBooks as jest.Mock).mockResolvedValue({
      data: [],
      pagination: { totalResultCount: 0 },
    });

    render(<BorrowedBooks />);

    await waitFor(() => {
      expect(
        screen.getByText(/no books are currently borrowed/i)
      ).toBeInTheDocument();
    });
  });

  test("renders borrowed books list correctly", async () => {
    (BookService.getBooks as jest.Mock).mockResolvedValue({
      data: mockBooks,
      pagination: { totalResultCount: 2 },
    });

    render(<BorrowedBooks />);

    await waitFor(() => {
      expect(screen.getByText(/borrowed books/i)).toBeInTheDocument();
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
      expect(screen.getByText("12/1/2023")).toBeInTheDocument();
    });
  });

  test("handles pagination changes", async () => {
    (BookService.getBooks as jest.Mock).mockResolvedValue({
      data: mockBooks,
      pagination: { totalResultCount: 2 },
    });

    render(<BorrowedBooks />);

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
    });

    const nextPageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(BookService.getBooks).toHaveBeenCalledWith(1, 5, {
        availability: false,
      });
    });
  });

  test("handles rows per page change", async () => {
    (BookService.getBooks as jest.Mock).mockResolvedValue({
      data: mockBooks,
      pagination: { totalResultCount: 2 },
    });

    render(<BorrowedBooks />);

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
    });

    const rowsPerPageDropdown = screen.getByLabelText("Rows per page:");
    fireEvent.mouseDown(rowsPerPageDropdown);

    const dropdownOption = await screen.findByText("10");
    fireEvent.click(dropdownOption);

    await waitFor(() => {
      expect(BookService.getBooks).toHaveBeenCalledWith(1, 10, {
        availability: false,
      });
    });
  });
});
