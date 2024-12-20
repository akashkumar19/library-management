import { Request, Response, NextFunction } from "express";
import { Database } from "sqlite";

export class BookController {
  constructor(private db: Database) {}

  getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, perPage = 10, offset = 0 } = req.pagination;
      const { search, author, genre, availability } = req.query;

      if (page < 1 || perPage < 1) {
        res.status(400).json({
          error: "Invalid pagination parameters",
          details: "Page and perPage must be positive numbers"
        });
        return;
      }

      let whereClause = '1=1';
      const params: any[] = [];

      if (search) {
        whereClause += ' AND (title LIKE ? OR author LIKE ? OR isbn LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      if (author) {
        whereClause += ' AND (author LIKE ?)';
        params.push(`%${author}%`);
      }

      if (genre) {
        whereClause += ' AND genre = ?';
        params.push(genre);
      }

      if (availability !== undefined) {
        if (typeof availability !== 'string' || !['true', 'false'].includes(availability)) {
          res.status(400).json({
            error: "Invalid availability parameter",
            details: "Availability must be 'true' or 'false'"
          });
          return;
        }
        whereClause += ' AND available = ?';
        params.push(availability === 'true' ? 1 : 0);
      }

      const totalResult = await this.db.get(
        `SELECT COUNT(*) as total FROM books WHERE ${whereClause}`,
        ...params
      );

      if (!totalResult) {
        res.status(500).json({
          error: "Database error",
          details: "Failed to retrieve total count"
        });
        return;
      }

      const total = totalResult.total;

      const query = `
        SELECT books.*,
               borrowers.name as borrower_name,
               borrowers.email as borrower_email,
               borrowers.phone as borrower_phone
        FROM books
        LEFT JOIN borrowers ON books.borrower_id = borrowers.id
        WHERE ${whereClause}
        LIMIT ? OFFSET ?
      `;

      const books = await this.db.all(query, ...params, perPage, offset);

      const totalPages = Math.ceil(total / perPage);
      const pagination = {
        page,
        perPage,
        currentPageCount: books.length,
        totalResultCount: total,
        totalPages
      };

      res.json({ data: books, pagination });
    } catch (error) {
      next(error);
    }
  };

  addBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookData = req.body;
      
      const existingBook = await this.db.get(
        "SELECT id FROM books WHERE isbn = ?",
        bookData.isbn
      );

      if (existingBook) {
        res.status(409).json({
          error: "Duplicate ISBN",
          details: "A book with this ISBN already exists"
        });
        return;
      }

      const result = await this.db.run(
        "INSERT INTO books (title, author, genre, isbn, available) VALUES (?, ?, ?, ?, 1)",
        bookData.title,
        bookData.author,
        bookData.genre,
        bookData.isbn
      );

      if (!result?.lastID) {
        throw new Error("Failed to insert book");
      }

      res.status(201).json({ id: result.lastID });
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const bookData = req.body;

      const existingBook = await this.db.get(
        "SELECT id FROM books WHERE id = ?",
        id
      );

      if (!existingBook) {
        res.status(404).json({
          error: "Book not found",
          details: "No book exists with the provided ID"
        });
        return;
      }

      const duplicateISBN = await this.db.get(
        "SELECT id FROM books WHERE isbn = ? AND id != ?",
        bookData.isbn,
        id
      );

      if (duplicateISBN) {
        res.status(409).json({
          error: "Duplicate ISBN",
          details: "Another book with this ISBN already exists"
        });
        return;
      }

      await this.db.run(
        "UPDATE books SET title = ?, author = ?, genre = ?, isbn = ? WHERE id = ?",
        bookData.title,
        bookData.author,
        bookData.genre,
        bookData.isbn,
        id
      );

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const book = await this.db.get(
        "SELECT available, borrower_id FROM books WHERE id = ?",
        id
      );

      if (!book) {
        res.status(404).json({
          error: "Book not found",
          details: "No book exists with the provided ID"
        });
        return;
      }

      if (!book.available && book.borrower_id) {
        res.status(400).json({
          error: "Book is borrowed",
          details: "Cannot delete a book that is currently borrowed"
        });
        return;
      }

      await this.db.run("DELETE FROM books WHERE id = ?", id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { action } = req.query;

      if (!['borrow', 'return'].includes(action as string)) {
        res.status(400).json({
          error: "Invalid action",
          details: "Action must be either 'borrow' or 'return'"
        });
        return;
      }

      const book = await this.db.get(
        "SELECT available, borrower_id FROM books WHERE id = ?",
        id
      );

      if (!book) {
        res.status(404).json({
          error: "Book not found",
          details: "No book exists with the provided ID"
        });
        return;
      }

      await this.db.run("BEGIN TRANSACTION");

      try {
        if (action === "borrow") {
          if (!book.available) {
            await this.db.run("ROLLBACK");
            res.status(400).json({
              error: "Book unavailable",
              details: "This book is already borrowed"
            });
            return;
          }

          const borrowerData = req.body;

          let borrower = await this.db.get(
            "SELECT * FROM borrowers WHERE email = ?",
            borrowerData.email
          );

          if (!borrower) {
            const result = await this.db.run(
              "INSERT INTO borrowers (name, email, phone) VALUES (?, ?, ?)",
              borrowerData.name,
              borrowerData.email,
              borrowerData.phone
            );
            
            if (!result?.lastID) {
              throw new Error("Failed to create borrower");
            }
            
            borrower = { id: result.lastID };
          }

          await this.db.run(
            `UPDATE books 
             SET available = 0, 
                 borrower_id = ?, 
                 borrow_date = CURRENT_TIMESTAMP 
             WHERE id = ?`,
            borrower.id,
            id
          );
        } else if (action === "return") {
          if (book.available) {
            await this.db.run("ROLLBACK");
            res.status(400).json({
              error: "Invalid return",
              details: "This book is not currently borrowed"
            });
            return;
          }

          await this.db.run(
            "UPDATE books SET available = 1, borrower_id = NULL, borrow_date = NULL WHERE id = ?",
            id
          );
        }

        await this.db.run("COMMIT");
        res.json({ success: true });
      } catch (error) {
        await this.db.run("ROLLBACK");
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}