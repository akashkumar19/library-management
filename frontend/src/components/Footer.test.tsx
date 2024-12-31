import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("should render correctly", () => {
    render(<Footer />);

    const headerElement = screen.getByRole("heading", { name: /Library Management System/i });
    const descriptionElement = screen.getByText(/Your gateway to organized knowledge!/i);

    expect(headerElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should have correct text content", () => {
    render(<Footer />);

    const headerElement = screen.getByRole("heading", { name: /Library Management System/i });
    expect(headerElement).toHaveTextContent("Library Management System");

    const descriptionElement = screen.getByText(/Your gateway to organized knowledge!/i);
    expect(descriptionElement).toHaveTextContent("Your gateway to organized knowledge!");
  });
});
