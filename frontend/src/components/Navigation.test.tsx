import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("should render the app bar with the correct links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

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

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByText("Borrowed Books")).toBeInTheDocument();
  });
});
