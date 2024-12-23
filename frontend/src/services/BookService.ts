import axios from 'axios';
import { PaginatedResponse } from '../core/models/paginatedresponse.model';
import { Book, BookFilters, Borrower } from '../models';

const API_BASE_URL = 'http://localhost:3002/api';
const convertFiltersToParams = (filters: BookFilters & { page: number; perPage: number }) => {
    const params: Record<string, string> = {
        page: filters.page.toString(),
        perPage: filters.perPage.toString()
    };

    if (filters.search) {
        params.search = filters.search;
    }

    if (filters.author) {
        params.author = filters.author;
    }

    if (filters.genre) {
        params.genre = filters.genre;
    }

    if (filters.availability !== undefined) {
        params.availability = filters.availability.toString();
    }

    return new URLSearchParams(params);
};

export const BookService = {
    getBooks: async (page: number, perPage: number = 10, filters: BookFilters) => {
        const params = convertFiltersToParams({ ...filters, page, perPage: perPage });
        const response = await axios.get<PaginatedResponse<Book>>(`${API_BASE_URL}/books?${params}`);
        return response.data;
    },

    addBook: async (book: Partial<Book>) => {
        const response = await axios.post(`${API_BASE_URL}/books`, book);
        return response.data;
    },

    updateBook: async (id: number, book: Partial<Book>) => {
        const response = await axios.put(`${API_BASE_URL}/books/${id}`, book);
        return response.data;
    },

    deleteBook: async (id: number) => {
        await axios.delete(`${API_BASE_URL}/books/${id}`);
    },

    borrowBook: async (id: number, borrowerDetails: Borrower) => {
        const response = await axios.patch(`${API_BASE_URL}/books/${id}/borrow?action=borrow`, borrowerDetails);
        return response.data;
    },

    returnBook: async (id: number) => {
        const response = await axios.patch(`${API_BASE_URL}/books/${id}/borrow?action=return`);
        return response.data;
    }
};