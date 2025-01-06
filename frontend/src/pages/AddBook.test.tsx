import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GENRES } from "../core/constants/genre";
import { BookService } from "../services/BookService";
import { AddBook } from "./AddBook";

jest.mock("../services/BookService");

describe("AddBook Component", () => {
  const mockSetNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders AddEditBookForm and Paper components", () => {
    render(<AddBook />);

    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /genre/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /isbn/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("displays success notification on successful book addition", async () => {
    (BookService.addBook as jest.Mock).mockResolvedValueOnce({});

    render(<AddBook />);

    const user = userEvent.setup();

    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), "Test Book");
    await user.type(screen.getByLabelText(/author/i), "Test Author");
    const genreSelect = screen.getByLabelText(/genre/i);
    fireEvent.mouseDown(genreSelect);
    const option = screen.getByText(new RegExp(GENRES[0], "i"));
    fireEvent.click(option);
    await user.type(screen.getByLabelText(/isbn/i), "1234567890");

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the notification to appear
    await waitFor(() => {
      expect(screen.getByText("Book created successfully!")).toBeInTheDocument();
    });
  });

  test("displays error notification on failed book addition", async () => {
    (BookService.addBook as jest.Mock).mockRejectedValueOnce({
      response: { data: { details: "Error adding book" } },
    });

    render(<AddBook />);

    const user = userEvent.setup();

    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), "Test Book");
    await user.type(screen.getByLabelText(/author/i), "Test Author");
    const genreSelect = screen.getByLabelText(/genre/i);
    fireEvent.mouseDown(genreSelect);
    const option = screen.getByText(new RegExp(GENRES[0], "i"));
    fireEvent.click(option);
    await user.type(screen.getByLabelText(/isbn/i), "1234567890");

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the notification to appear
    await waitFor(() => {
      expect(screen.getByText("Error adding book")).toBeInTheDocument();
    });
  });
});