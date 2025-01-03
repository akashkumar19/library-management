
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
 * @param {boolean | string} availability - Book availability
 */
export interface BookFilters {
  search?: string;
  author?: string;
  genre?: string;
  availability?: boolean | string;
}

/**
 * @interface BookProps
 * @description Interface for Book Props
 * @param {number} id - id 
 * @param {string} title - title of the book
 * @param {string} author - Author of the book
 * @param {string} genre - genre of the book
 * @param {string} isbn - isbn of the book
 */
export interface BookProps {
  id?: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
}