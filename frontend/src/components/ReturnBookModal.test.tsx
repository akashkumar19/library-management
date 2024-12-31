import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReturnBookModal from "./ReturnBookModal";
import { BookService } from "../services/BookService";

jest.mock("../services/BookService");

describe("ReturnBookModal", () => {
  const mockOnClose = jest.fn();
  const mockOnReturnSuccess = jest.fn();
  const mockSetNotification = jest.fn();
  const book = { id: 1, title: "Test Book" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <ReturnBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onReturnSuccess={mockOnReturnSuccess}
        setNotification={mockSetNotification}
      />
    );

    expect(screen.getByText(/Return Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to return/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    const returnButton = screen.getByRole("button", { name: /return/i });
    expect(returnButton).toBeInTheDocument();
  });

  it("should call handleReturn when Return button is clicked and handle success", async () => {

    (BookService.returnBook as jest.Mock).mockResolvedValueOnce({});

    render(
      <ReturnBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onReturnSuccess={mockOnReturnSuccess}
        setNotification={mockSetNotification}
      />
    );

    const returnButton = screen.getByRole("button", { name: /return/i });
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(BookService.returnBook).toHaveBeenCalledWith(book.id);
      expect(mockSetNotification).toHaveBeenCalledWith({
        type: "success",
        message: "Book returned successfully!",
      });
      expect(mockOnReturnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("should call handleReturn when Return button is clicked and handle error", async () => {
    (BookService.returnBook as jest.Mock).mockRejectedValueOnce(new Error("Error returning book"));

    render(
      <ReturnBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onReturnSuccess={mockOnReturnSuccess}
        setNotification={mockSetNotification}
      />
    );

    const returnButton = screen.getByRole("button", { name: /return/i });
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(BookService.returnBook).toHaveBeenCalledWith(book.id);
      expect(mockSetNotification).toHaveBeenCalledWith({
        type: "error",
        message: "Error returning book",
      });
      expect(mockOnReturnSuccess).not.toHaveBeenCalled();
    });
  });

  it("should close the modal when Cancel button is clicked", () => {
    render(
      <ReturnBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onReturnSuccess={mockOnReturnSuccess}
        setNotification={mockSetNotification}
      />
    );

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
