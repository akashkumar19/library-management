import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders Navigation, AppRoutes, and Footer components", () => {
    render(
        <App />
    );

    expect(screen.getByText("Library Management")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /add book/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /borrowed books/i })).toBeInTheDocument();

    // Check if Footer is rendered
    expect(screen.getByText("Library Management System")).toBeInTheDocument();
    expect(screen.getByText("Your gateway to organized knowledge!")).toBeInTheDocument();
  });

  test("renders Dashboard route by default", () => {
    render(
        <App />
    );

    // Check if Dashboard is rendered by default
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("renders AddBook route when navigated to /add-book", () => {
    render(
        <App />
    );

    // navigation to /add-book
    fireEvent.click(screen.getByRole("link", { name: /add book/i }));

    // Check if AddBook is rendered
    expect(screen.getByRole('heading', { level: 4, name: /add book/i })).toBeInTheDocument();
  });

  test("renders BorrowedBooks route when navigated to /borrowed-books", () => {
    render(
        <App />
    );

    // navigation to /borrowed-books
    fireEvent.click(screen.getByRole("link", { name: /borrowed books/i }));

    // Check if BorrowedBooks is rendered
    expect(screen.getByText("Borrowed Books")).toBeInTheDocument();
  });
});