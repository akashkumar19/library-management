import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookService } from "../services/BookService";
import DeleteBookModal from "./DeleteBookModal";

jest.mock("../services/BookService");

describe("DeleteBookModal", () => {
  const mockOnClose = jest.fn();
  const mockOnDeleteSuccess = jest.fn();
  const mockSetNotification = jest.fn();

  const book = { id: 1, title: "Test Book" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <DeleteBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onDeleteSuccess={mockOnDeleteSuccess}
        setNotification={mockSetNotification}
      />
    );

    expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete the book/i)).toBeInTheDocument();
  });

  it("should handle successful delete", async () => {
    (BookService.deleteBook as jest.Mock).mockResolvedValueOnce({});

    render(
      <DeleteBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onDeleteSuccess={mockOnDeleteSuccess}
        setNotification={mockSetNotification}
      />
    );

    // clicking the delete button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockSetNotification).toHaveBeenCalledWith({
      type: "success",
      message: "Book deleted successfully!",
    }));

    expect(mockOnDeleteSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should handle delete failure", async () => {
    const errorResponse = { response: { data: { details: "Error deleting book" } } };
    (BookService.deleteBook as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(
      <DeleteBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onDeleteSuccess={mockOnDeleteSuccess}
        setNotification={mockSetNotification}
      />
    );

    // clicking the delete button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockSetNotification).toHaveBeenCalledWith({
      type: "error",
      message: "Error deleting book",
    }));

    expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
  });

  it("should handle cancel", () => {
    render(
      <DeleteBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onDeleteSuccess={mockOnDeleteSuccess}
        setNotification={mockSetNotification}
      />
    );

    // clicking the cancel button
    fireEvent.click(screen.getByText(/cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
