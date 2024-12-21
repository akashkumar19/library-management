/**
 * @interface Borrower
 *  @description Borrower model
 * @param {number} id - Borrower id
 * @param {string} name - Borrower name
 * @param {string} email - Borrower email
 * @param {string} phone - Borrower phone
 */
export interface Borrower {
    id?: number;
    name: string;
    email: string;
    phone: string;
}