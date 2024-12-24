import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

// Test suite for Navigation component
describe("Navigation", () => {
  it("should render the app bar with the correct links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check that the AppBar contains the correct links
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByText("Borrowed Books")).toBeInTheDocument();
  });

  it("should render navigation links in desktop view", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check that the navigation links are displayed in the desktop view
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByText("Borrowed Books")).toBeInTheDocument();
  });
});
