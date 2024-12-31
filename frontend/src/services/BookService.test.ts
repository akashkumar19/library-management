import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BookService } from './BookService';
import { PaginatedResponse } from '../core/models/paginatedresponse.model';
import { Book } from '../models';

describe('BookService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe('getBooks', () => {
    it('should fetch books with the given filters', async () => {
      const filters = { search: 'Test', author: 'John Doe', genre: 'Action', availability: true };
      const mockResponse: PaginatedResponse<Book> = {
        data: [
          {
              id: 1, title: 'Book 1', author: 'John Doe', genre: 'Fiction', isbn: '1234567890',
              available: false
          },
        ],
        pagination: { page: 1, perPage: 10, totalResultCount: 1, totalPages: 1 },
      };

      mockAxios.onGet('http://localhost:3002/api/books?page=1&perPage=10&search=Test&author=John+Doe&genre=Action&availability=true').reply(200, mockResponse);

      const response = await BookService.getBooks(1, 10, filters);
      expect(response).toEqual(mockResponse);
    });

    it('should return an empty array if no books found', async () => {
      const filters = { search: 'nonexistent', author: '', genre: '', availability: undefined };
      const mockResponse: PaginatedResponse<Book> = {
        data: [],
        pagination: { page: 1, perPage: 10, totalResultCount: 0, totalPages: 0 },
      };

      mockAxios.onGet('http://localhost:3002/api/books?page=1&perPage=10&search=nonexistent').reply(200, mockResponse);

      const response = await BookService.getBooks(1, 10, filters);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const newBook = { title: 'New Book', author: 'Jane Doe', genre: 'Non-Fiction', isbn: '9876543210' };
      const mockResponse = { ...newBook, id: 1 };

      mockAxios.onPost('http://localhost:3002/api/books').reply(201, mockResponse);

      const response = await BookService.addBook(newBook);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error while adding a book', async () => {
      const newBook = { title: 'New Book', author: 'Jane Doe', genre: 'Non-Fiction', isbn: '9876543210' };

      mockAxios.onPost('http://localhost:3002/api/books').reply(500, { message: 'Error' });

      try {
        await BookService.addBook(newBook);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const updatedBook = { title: 'Updated Book', author: 'Jane Doe' };
      const mockResponse = { ...updatedBook, id: 1 };

      mockAxios.onPut('http://localhost:3002/api/books/1').reply(200, mockResponse);

      const response = await BookService.updateBook(1, updatedBook);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error while updating a book', async () => {
      const updatedBook = { title: 'Updated Book', author: 'Jane Doe' };

      mockAxios.onPut('http://localhost:3002/api/books/1').reply(500, { message: 'Error' });

      try {
        await BookService.updateBook(1, updatedBook);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      mockAxios.onDelete('http://localhost:3002/api/books/1').reply(200);

      await BookService.deleteBook(1);
      expect(mockAxios.history.delete.length).toBe(1);
    });

    it('should handle error while deleting a book', async () => {
      mockAxios.onDelete('http://localhost:3002/api/books/1').reply(500, { message: 'Error' });

      try {
        await BookService.deleteBook(1);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('borrowBook', () => {
    it('should borrow a book successfully', async () => {
      const borrowerDetails = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
      const mockResponse = { success: true };

      mockAxios.onPatch('http://localhost:3002/api/books/1/borrow?action=borrow').reply(200, mockResponse);

      const response = await BookService.borrowBook(1, borrowerDetails);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error while borrowing a book', async () => {
      const borrowerDetails = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };

      mockAxios.onPatch('http://localhost:3002/api/books/1/borrow?action=borrow').reply(500, { message: 'Error' });

      try {
        await BookService.borrowBook(1, borrowerDetails);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      const mockResponse = { success: true };

      mockAxios.onPatch('http://localhost:3002/api/books/1/borrow?action=return').reply(200, mockResponse);

      const response = await BookService.returnBook(1);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error while returning a book', async () => {
      mockAxios.onPatch('http://localhost:3002/api/books/1/borrow?action=return').reply(500, { message: 'Error' });

      try {
        await BookService.returnBook(1);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
