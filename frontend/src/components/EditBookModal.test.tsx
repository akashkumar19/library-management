import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditBookModal from "./EditBookModal";
import { BookService } from "../services/BookService";

jest.mock("../services/BookService");

describe("EditBookModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockSetNotification = jest.fn();

  const book = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    genre: "Action",
    isbn: "123-456-789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with the correct book data", () => {
    render(
      <EditBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onSave={mockOnSave}
        setNotification={mockSetNotification}
      />
    );

    // Check if modal elements are rendered
    expect(screen.getByText(/Edit Book/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.author)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.genre)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.isbn)).toBeInTheDocument();
  });

  it("should submit the form and update the book successfully", async () => {
    (BookService.updateBook as jest.Mock).mockResolvedValueOnce({});

    render(
      <EditBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onSave={mockOnSave}
        setNotification={mockSetNotification}
      />
    );

    // Simulate the form submission
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => expect(BookService.updateBook).toHaveBeenCalledTimes(1));
    expect(BookService.updateBook).toHaveBeenCalledWith(book.id, expect.objectContaining({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
    }));

    expect(mockSetNotification).toHaveBeenCalledWith({
      type: "success",
      message: "Book updated successfully!",
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when the book update fails", async () => {
    const errorResponse = { response: { data: { details: "Failed to update book" } } };
    (BookService.updateBook as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(
      <EditBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onSave={mockOnSave}
        setNotification={mockSetNotification}
      />
    );

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => expect(BookService.updateBook).toHaveBeenCalledTimes(1));

    expect(mockSetNotification).toHaveBeenCalledWith({
      type: "error",
      message: "Failed to update book",
    });

    expect(mockOnClose).toHaveBeenCalledTimes(0);
    expect(mockOnSave).toHaveBeenCalledTimes(0);
  });
});
