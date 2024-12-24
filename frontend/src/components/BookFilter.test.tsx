import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('BookFilter Component', () => {
  const mockHandleFilterChange = jest.fn();
  const mockHandleClearFilters = jest.fn();

  const initialFilters = {
    search: '',
    author: '',
    genre: '',
    availability: '',
  };

  it('should render all filter inputs correctly', () => {
    render(
      <BookFilter
        filters={initialFilters}
        handleFilterChange={mockHandleFilterChange}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    // Check if all filter fields and the "Clear All" button are rendered
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });


  it('should call handleClearFilters when "Clear All" button is clicked', () => {
    render(
      <BookFilter
        filters={initialFilters}
        handleFilterChange={mockHandleFilterChange}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);

    expect(mockHandleClearFilters).toHaveBeenCalled();
  });


  it('should show correct values in input fields based on filters', () => {
    const filters = {
      search: 'Harry Potter',
      author: 'J.K. Rowling',
      genre: 'Romance',
      availability: "",
    };

    render(
      <BookFilter
        filters={filters}
        handleFilterChange={mockHandleFilterChange}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    // Check that the input fields have the correct values from the filters
    expect(screen.getByLabelText('Search')).toHaveValue(filters.search);
    expect(screen.getByLabelText('Author')).toHaveValue(filters.author);
  });
});
