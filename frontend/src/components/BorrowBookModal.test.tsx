import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BorrowBookModal from './BorrowBookModal';

jest.mock('../services/BookService', () => ({
  default: {
    borrowBook: jest.fn(),
  },
}));

describe('BorrowBookModal', () => {
  const mockOnClose = jest.fn();
  const mockOnBorrowSuccess = jest.fn();
  const mockSetNotification = jest.fn();

  const book = {
    id: 1,
    title: 'The Great Gatsby',
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnBorrowSuccess.mockClear();
    mockSetNotification.mockClear();
    // (BookService.borrowBook as jest.Mock).mockClear();
  });

  it('should render the modal with the necessary fields and buttons', () => {
    render(
      <BorrowBookModal
        open={true}
        onClose={mockOnClose}
        book={book}
        onBorrowSuccess={mockOnBorrowSuccess}
        setNotification={mockSetNotification}
      />
    );

    expect(screen.getByText('Borrow Book')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Borrow')).toBeInTheDocument();
  });
});
