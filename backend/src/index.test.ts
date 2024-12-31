import express from 'express';
import request from 'supertest';
import { initializeDatabase } from './config/database';
import fs from 'fs';
import { Database } from 'sqlite';
import { BookController } from './controllers/bookController';
import { createBookRouter } from './routes/bookRoutes';

describe('Application Test', () => {
    let app: express.Application;
    let db: Database;
    let bookController: BookController;

    const dbPath = './test.db';

    beforeAll(async () => {
        db = await initializeDatabase(dbPath);
        bookController = new BookController(db);
        app = express();

        // Setup middleware and router just like in index.ts
        app.use(express.json());
        app.use('/api/books', createBookRouter(bookController));
    });

    afterAll(async () => {
        if (db) {
            await db.close();
        }

        // Delete the test database file
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }
    });

    beforeEach(async () => {
        await db.run(`INSERT INTO books (title, author, genre, isbn) VALUES 
      ('Test Book 1', 'Author 1', 'Genre 1', '111111'),
      ('Test Book 2', 'Author 2', 'Genre 2', '222222')`);
    });

    afterEach(async () => {
        await db.run('DELETE FROM books');
        await db.run('DELETE FROM sqlite_sequence WHERE name="books"');
    });

    test('GET /api/books should return all books', async () => {
        const response = await request(app).get('/api/books');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data).toHaveLength(2); // Since we inserted 2 books in beforeEach
    });

    test('POST /api/books should create a new book', async () => {
        const newBook = { title: 'New Test Book', author: 'New Author', genre: 'New Genre', isbn: '123456' };

        const response = await request(app).post('/api/books').send(newBook);

        expect(response.status).toBe(201);
        expect(response.body.id).not.toBeNull();

        // Verify the new book is in the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', [response.body.id]);
        expect(book).toMatchObject(newBook);
    });

    test('PUT /api/books/:id should update a book', async () => {
        const updatedBook = { title: 'Updated Title', author: 'Updated Author', genre: 'Updated Genre', isbn: '654321' };

        const response = await request(app).put('/api/books/1').send(updatedBook);

        expect(response.status).toBe(200);

        // Verify the book was updated in the database
        const book = await db.get('SELECT * FROM books WHERE id = 1');
        expect(book).toMatchObject(updatedBook);
    });

    test('PATCH /api/books/:id/borrow should borrow a book', async () => {
        const borrowInfo = { name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' };

        const response = await request(app).patch('/api/books/1/borrow?action=borrow').send(borrowInfo);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        // Verify the borrow information is stored in the database (if applicable)
        const book = await db.get(`SELECT books.*,
               borrowers.name as borrower_name,
               borrowers.email as borrower_email,
               borrowers.phone as borrower_phone
        FROM books
        LEFT JOIN borrowers ON books.borrower_id = borrowers.id`);
        expect(book.borrower_name).toBe(borrowInfo.name);
    });

    test('DELETE /api/books/:id should delete a book', async () => {
        const response = await request(app).delete('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });

        // Verify the book was deleted from the database
        const book = await db.get('SELECT * FROM books WHERE id = 1');
        expect(book).toBeUndefined();
    });
});
