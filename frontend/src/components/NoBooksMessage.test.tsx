import { render, screen, fireEvent } from "@testing-library/react";
import NoBooksMessage from "./NoBooksMessage";

describe("NoBooksMessage", () => {
  it("should render the no books found message", () => {
    render(<NoBooksMessage />);

    expect(screen.getByText(/No Books Found/i)).toBeInTheDocument();
    expect(screen.getByText(/It seems like there are no books available at the moment./i)).toBeInTheDocument();
    expect(screen.getByText(/Try clearing or adjusting the filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Add new books to the library/i)).toBeInTheDocument();
  });

  it("should display the 'Clear Filters' button if onClearFilters is provided", () => {
    const mockClearFilters = jest.fn();
    render(<NoBooksMessage onClearFilters={mockClearFilters} />);

    const clearFiltersButton = screen.getByText(/Clear Filters/i);
    expect(clearFiltersButton).toBeInTheDocument();

    fireEvent.click(clearFiltersButton);
    expect(mockClearFilters).toHaveBeenCalledTimes(1);
  });

  it("should not display the 'Clear Filters' button if onClearFilters is not provided", () => {
    render(<NoBooksMessage />);

    const clearFiltersButton = screen.queryByText(/Clear Filters/i);
    expect(clearFiltersButton).not.toBeInTheDocument();
  });
});
