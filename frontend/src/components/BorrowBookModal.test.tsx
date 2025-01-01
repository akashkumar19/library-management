import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BorrowBookModal from "./BorrowBookModal";
import { BookService } from "../services/BookService";

jest.mock("../services/BookService");

describe("BorrowBookModal", () => {
  const mockOnClose = jest.fn();
  const mockOnBorrowSuccess = jest.fn();
  const mockSetNotification = jest.fn();

  const book = {
    id: 1,
    title: "Test Book",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with book details", () => {
    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    expect(screen.getByText(/Borrow Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter your details to borrow/i)).toBeInTheDocument();
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  it("should update state on input change", () => {
    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i) as HTMLInputElement, { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i) as HTMLInputElement, { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i) as HTMLInputElement, { target: { value: "1234567890" } });

    expect((screen.getByLabelText(/Name/i) as HTMLInputElement).value).toBe("John Doe");
    expect((screen.getByLabelText(/Email/i) as HTMLInputElement).value).toBe("john@example.com");
    expect((screen.getByLabelText(/Phone/i) as HTMLInputElement).value).toBe("1234567890");
  });

  it("should successfully borrow the book and show success message", async () => {
    (BookService.borrowBook as jest.Mock).mockResolvedValueOnce({});

    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "1234567890" } });

    const borrowButton = screen.getByRole("button", { name: /borrow/i });
    fireEvent.click(borrowButton);

    await waitFor(() => expect(BookService.borrowBook).toHaveBeenCalledTimes(1));
    expect(BookService.borrowBook).toHaveBeenCalledWith(book.id, {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    });

    expect(mockSetNotification).toHaveBeenCalledWith({
      type: "success",
      message: "Congratulations John Doe! You have successfully borrowed Test Book.",
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnBorrowSuccess).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when borrowing the book", async () => {
    const errorResponse = { response: { data: { message: "Borrowing failed" } } };
    (BookService.borrowBook as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "1234567890" } });

    // clicking the "Borrow" button
    const borrowButton = screen.getByRole("button", { name: /borrow/i });
    fireEvent.click(borrowButton);

    await waitFor(() => expect(BookService.borrowBook).toHaveBeenCalledTimes(1));

    expect(mockSetNotification).toHaveBeenCalledWith({
      type: "error",
      message: "Error borrowing book",
    });

    expect(mockOnClose).toHaveBeenCalledTimes(0);
    expect(mockOnBorrowSuccess).toHaveBeenCalledTimes(0);
  });

  it("should close the modal when the 'Cancel' button is clicked", () => {
    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
