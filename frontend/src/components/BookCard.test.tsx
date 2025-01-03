import { fireEvent, render, screen } from "@testing-library/react";
import BookCard from "./BookCard";

describe("BookCard Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnBorrowOrReturn = jest.fn();

  const bookProps = {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    isbn: "9780743273565",
    available: true,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onBorrowOrReturn: mockOnBorrowOrReturn,
  };

  it("should render book information correctly", () => {
    render(<BookCard {...bookProps} />);

    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("Genre:")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("9780743273565")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("should trigger edit function when Edit button is clicked", () => {
    render(<BookCard {...bookProps} />);

    const editButton = screen.getByText("EDIT");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(bookProps.id);
  });

  it("should trigger delete function when Delete button is clicked", () => {
    render(<BookCard {...bookProps} />);

    const deleteButton = screen.getByText("DELETE");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(bookProps.id);
  });

  it("should trigger borrow function when Borrow button is clicked", () => {
    render(<BookCard {...bookProps} />);

    const borrowButton = screen.getByText("BORROW");
    fireEvent.click(borrowButton);

    expect(mockOnBorrowOrReturn).toHaveBeenCalledWith(bookProps.id);
  });

  it("should render Borrow/Return button with the correct label depending on availability", () => {
    // Test for available book
    render(<BookCard {...bookProps} />);
    expect(screen.getByText("BORROW")).toBeInTheDocument();

    // Test for borrowed book
    const borrowedBookProps = {
      ...bookProps,
      available: false,
      borrower_name: "John Doe",
    };
    render(<BookCard {...borrowedBookProps} />);
    expect(screen.getByText("RETURN")).toBeInTheDocument();
    expect(screen.getByText("Borrowed by John Doe")).toBeInTheDocument();
  });

  it("should change availability text color based on availability status", () => {
    render(<BookCard {...bookProps} />);
    const availabilityText = screen.getByText("Available");
    expect(availabilityText).toBeInTheDocument();

    const borrowedBookProps = {
      ...bookProps,
      available: false,
      borrower_name: "John Doe",
    };
    render(<BookCard {...borrowedBookProps} />);
    const borrowedText = screen.getByText("Borrowed by John Doe");
    expect(borrowedText).toHaveStyle("color: #d32f2f");
  });
});
