import { Borrower } from "./borrower.model";

/**
 * @interface Book
 * @description Book model
 * @param {number} id - Book id
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @param {string} genre - Book genre
 * @param {string} isbn - Book isbn
 * @param {boolean} available - Book availability
 * @param {string} borrow_date - Book borrow date
 * @param {Borrower} borrower - Book borrower
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  available: boolean;
  borrow_date?: string;
  borrower_name?: string;
  borrower_email?: string;
  borrower_phone?: string;
}

/**
 * @interface BookFilters
 * @description Book filters
 * @param {string} search - Book search
 * @param {string} author - Book author
 * @param {string} genre - Book genre
 * @param {boolean} availability - Book availability
 */
export interface BookFilters {
  search?: string;
  author?: string;
  genre?: string;
  availability?: boolean;
}