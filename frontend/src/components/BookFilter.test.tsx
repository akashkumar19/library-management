import { fireEvent, render, screen } from "@testing-library/react";
import { GENRES } from "../core/constants/genre";
import BookFilter from "./BookFilter";
import { time } from "console";
import { TIMEOUT } from "dns";

describe("BookFilter Component", () => {
  const mockFilters = {
    search: "",
    author: "",
    genre: "",
    availability: "",
  };

  const mockHandleFilterChange = jest.fn();
  const mockHandleClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter fields and the clear button", () => {
    render(
      <BookFilter
        filters={mockFilters}
        handleFilterChange={mockHandleFilterChange}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/availability/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /clear all/i })
    ).toBeInTheDocument();
  });

//   it("calls handleFilterChange when a filter field changes", () => {
//     render(
//       <BookFilter
//         filters={mockFilters}
//         handleFilterChange={mockHandleFilterChange}
//         handleClearFilters={mockHandleClearFilters}
//       />
//     );

//     const searchInput = screen.getByLabelText(/search/i);
//     fireEvent.change(searchInput, {
//       target: { name: "search", value: "React" },
//     });

//     const authorInput = screen.getByLabelText(/author/i);
//     fireEvent.change(authorInput, {
//       target: { name: "author", value: "Author Name" },
//     });

//     const genreSelect = screen.getByLabelText(/genre/i);
//     fireEvent.mouseDown(genreSelect);
//     const option = screen.getByText(new RegExp(GENRES[0], "i"));
//     fireEvent.click(option);

//     const availabilitySelect = screen.getByLabelText(/availability/i);
//     fireEvent.mouseDown(availabilitySelect);
//     const availabilityOption = screen.getByText(/available/i);
//     fireEvent.click(availabilityOption);
//     setTimeout(() => {}, 1000)
//     expect(mockHandleFilterChange).toHaveBeenCalledTimes(4); // Once for each field
//   });

  it("calls handleClearFilters when the clear button is clicked", () => {
    render(
      <BookFilter
        filters={mockFilters}
        handleFilterChange={mockHandleFilterChange}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    const clearButton = screen.getByRole("button", { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(mockHandleClearFilters).toHaveBeenCalledTimes(1);
  });
});
