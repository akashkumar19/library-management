import { fireEvent, render, screen } from "@testing-library/react";
import { GENRES } from "../core/constants/genre";
import AddEditBookForm from "./AddEditBookForm";

describe("AddEditBookForm", () => {
  const mockOnSubmit = jest.fn();
  const initialData = {
    title: "Test Title",
    author: "Test Author",
    genre: GENRES[0],
    isbn: "1234567890",
  };

  it("renders the form fields correctly with initial data", () => {
    render(
      <AddEditBookForm initialData={initialData} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue(initialData.title);
    expect(screen.getByLabelText(/author/i)).toHaveValue(initialData.author);
    expect(screen.getByLabelText(/isbn/i)).toHaveValue(initialData.isbn);
  });

  it("allows users to change input values", () => {
    render(<AddEditBookForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const genreInput = screen.getByLabelText(/genre/i);
    const isbnInput = screen.getByLabelText(/isbn/i);

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });
    fireEvent.change(isbnInput, { target: { value: "9876543210" } });

    fireEvent.mouseDown(genreInput);
    const option = screen.getByText(new RegExp(GENRES[0], "i"));
    fireEvent.click(option);

    expect(titleInput).toHaveValue("New Title");
    expect(authorInput).toHaveValue("New Author");
    expect(isbnInput).toHaveValue("9876543210");
  });

  it("calls onSubmit with correct data when the form is submitted", () => {
    render(<AddEditBookForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const genreInput = screen.getByLabelText(/genre/i);
    const isbnInput = screen.getByLabelText(/isbn/i);

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });
    fireEvent.change(isbnInput, { target: { value: "9876543210" } });

    fireEvent.mouseDown(genreInput);
    const option = screen.getByText(new RegExp(GENRES[0], "i"));
    fireEvent.click(option);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        title: "New Title",
        author: "New Author",
        genre: GENRES[0],
        isbn: "9876543210",
      },
      expect.any(Function)
    );
  });

  it("renders genres in the dropdown menu", () => {
    render(<AddEditBookForm onSubmit={mockOnSubmit} />);

    fireEvent.mouseDown(screen.getByLabelText(/genre/i));
    const dropdownOptions = GENRES.map((genre) =>
      screen.getByText(new RegExp(genre, "i"))
    );

    dropdownOptions.forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });
});
