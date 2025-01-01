# Library Management System

## Overview

The Library Management System is a web application designed to help manage a library's book inventory, borrowing, and returning processes. It provides an intuitive interface for librarians to add, edit, delete, and manage books, as well as for users to borrow and return books.

## Features

- **Dashboard**: View all books in the library, with options to filter by title, author, genre, and availability.
- **Add Book**: Add new books to the library's inventory.
- **Edit Book**: Edit details of existing books.
- **Delete Book**: Remove books from the library's inventory.
- **Borrow Book**: Borrow books from the library.
- **Return Book**: Return borrowed books to the library.
- **Notifications**: Receive success or error notifications for various actions.

## Technologies Used

- **Frontend**: React, TypeScript, Material-UI, KendoReact
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Testing**: Jest, React Testing Library

## Project Structure

```plaintext
library-management/
├── backend/
│   ├── config/
│   │   └── database.ts
|   |   └── database.test.ts
│   ├── controllers/
│   │   └── bookController.ts
│   ├── middleware/
│   │   └── paginationMiddleware.ts
|   |   └── paginationMiddleware.test.ts
│   ├── routes/
│   │   └── bookRoutes.ts
│   ├── index.ts
│   ├── index.test.ts
│   ├── .env
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEditBookForm.tsx
│   │   │   ├── AddEditBookForm.test.tsx
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookCard.test.tsx
│   │   │   ├── BookFilter.tsx
│   │   │   ├── BookFilter.test.tsx
│   │   │   ├── BorrowBookModal.tsx
│   │   │   ├── BorrowBookModal.test.tsx
│   │   │   ├── DeleteBookModal.tsx
│   │   │   ├── DeleteBookModal.test.tsx
│   │   │   ├── EditBookModal.tsx
│   │   │   ├── EditBookModal.test.tsx
│   │   │   ├── NoBooksMessage.tsx
│   │   │   ├── NoBooksMessage.test.tsx
│   │   │   ├── ReturnBookModal.tsx
│   │   │   ├── ReturnBookModal.test.tsx
│   │   │   └── Navigation.tsx
│   │   │   └── Navigation.test.tsx
│   │   ├── core/
│   │   │   ├── constants/
│   │   │   |   ├── genre.ts
│   │   │   ├── models/
│   │   │   |   ├── paginatedResponse.model.ts
│   │   ├── models/
│   │   │   ├── book.model.ts
│   │   │   ├── borrower.model.ts
│   │   │   ├── index.ts
│   │   ├── pages/
│   │   │   ├── AddBook.tsx
│   │   │   ├── AddBook.test.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Dashboard.test.tsx
│   │   │   └── BorrowedBooks.tsx
│   │   │   └── BorrowedBooks.test.tsx
│   │   ├── services/
│   │   │   └── BookService.ts
│   │   │   └── BookService.test.ts
│   │   ├── .babelrc
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   ├── AppRoutes.tsx
│   │   └── index.tsx
│   ├── public/
│   │   └── index.html
│   │   └── favicon.ico
│   ├── package.json
│   └── README.md
```
### Getting Started
#### Prerequisites
  - Node.js
  - npm
#### Installation
### Backend
  1. Navigate to the backend directory:
  ```shell
  cd library-management/backend
  ```
  2. Install dependencies:
  ```shell
  npm install
  ```
  3. Start the backend server:
  ```shell
  npm start
  ```
### Frontend
  1. Navigate to the frontend directory:
  ```shell
  cd library-management/frontend
  ```
  2. Install dependencies:
  ```shell
  npm install
  ```
  3. Start the development server:
  ```shell
  npm start
  ```
  4. Open your browser and navigate to `http://localhost:3000`.
### Running Tests
#### Backend
  1. Run the tests:
  ```shell
  npm test
  ```
#### Frontend
  1. Run the tests:
  ```shell
  npm test
  ```
### API Endpoints
#### Books
  - GET /api/books: Get all books
  - POST /api/books: Add a new book
  - PUT /api/books/:id: Update a book
  - DELETE /api/books/:id: Delete a book
  - PATCH /api/books/:id/borrow?action=borrow: Borrow a book
  - PATCH /api/books/:id/borrow?action=return: Return a book
### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.



