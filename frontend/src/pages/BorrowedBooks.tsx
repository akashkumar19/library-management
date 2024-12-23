import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Book } from "../models";
import { BookService } from "../services/BookService";

const BorrowedBooks: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchBorrowedBooks = async () => {
    const response = await BookService.getBooks(page + 1, rowsPerPage, {
      availability: false,
    });
    setBorrowedBooks(response.data || []);
    setTotal(response.pagination.totalResultCount || 0);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {borrowedBooks.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            color: "#555",
            minHeight: "70vh",
          }}>
          📚 No books are currently borrowed. Enjoy a good read! 😊
        </div>
      ) : (
        <>
          <Typography variant="h4" align="center" marginBottom={2}>
            Borrowed Books
          </Typography>
          <Paper elevation={5} sx={{ minHeight: "70vh", boxShadow: 3}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Title</TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Author</TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Borrower Name</TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Borrower Email</TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Borrower Phone</TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#2757b7" }}>Borrow Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrowedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.borrower_name}</TableCell>
                      <TableCell>{book.borrower_email}</TableCell>
                      <TableCell>{book.borrower_phone}</TableCell>
                      <TableCell>
                        {new Date(book.borrow_date || "").toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default BorrowedBooks;
