import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookFilter from "../components/BookFilter";
import BorrowBookModal from "../components/BorrowBookModal";
import DeleteBookModal from "../components/DeleteBookModal";
import EditBookModal from "../components/EditBookModal";
import NoBooksMessage from "../components/NoBooksMessage";
import ReturnBookModal from "../components/ReturnBookModal";
import SnackBar from "../components/SnackBar";
import { PaginationObject } from "../core/models/paginatedresponse.model";
import { Book } from "../models";
import { BookService } from "../services/BookService";
import CardSkeleton from "../components/CardSkeleton";
import { NotificationModel } from "../core/models";

const Dashboard: React.FC = () => {
  const [editSelectedBook, setEditSelectedBook] = useState<any | null>(null);
  const [deleteSelectedBook, setDeleteSelectedBook] = useState<any | null>(
    null
  );
  const [borrowSelectedBook, setBorrowSelectedBook] = useState<any | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState<NotificationModel | null>(null);

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<PaginationObject>({
    page: 1,
    perPage: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
    author: "",
    genre: "",
    availability: "",
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { search, author, genre, availability } = filters;
      const availabilityValue =
        availability === "true"
          ? true
          : availability === "false"
          ? false
          : undefined;
      const response = await BookService.getBooks(
        pagination.page,
        pagination.perPage,
        { search, author, genre, availability: availabilityValue }
      );
      setBooks(response.data || []);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error fetching books",
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters, pagination.page]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPagination({ ...pagination, page: 1 });
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleClearFilters = () => {
    setFilters({
      author: "",
      genre: "",
      availability: "",
      search: "",
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleEdit = (book: any) => {
    setEditSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleDelete = (book: any) => {
    setDeleteSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditSelectedBook(null);
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteSelectedBook(null);
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    fetchBooks(); // Refresh the books after saving
  };

  const handleBorrowOrReturn = (book: any) => {
    setBorrowSelectedBook(book);
    if (book.available) {
      setIsBorrowModalOpen(true);
    } else {
      setIsReturnModalOpen(true);
    }
  };

  const handleCloseBorrowModal = () => {
    setBorrowSelectedBook(null);
    setIsBorrowModalOpen(false);
  };

  const handleCloseReturnModal = () => {
    setBorrowSelectedBook(null);
    setIsReturnModalOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPagination({ ...pagination, page });
  };
  const loadingSkeleton = () => {
    const skeletonList = [];
    for(let i=0; i<6; i++) {
      skeletonList.push(<CardSkeleton shape="form" />);
    }
    return skeletonList;
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 3,
        }}
      >
        {loadingSkeleton()}
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <BookFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
        />
        {/* Book Cards */}
        {books.length === 0 ? (
          <NoBooksMessage onClearFilters={handleClearFilters} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: 3,
              }}>
              
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  isbn={book.isbn}
                  available={book.available}
                  borrower_name={book.borrower_name}
                  onEdit={() => handleEdit(book)}
                  onDelete={() => handleDelete(book)}
                  onBorrowOrReturn={() => handleBorrowOrReturn(book)}
                />
              ))}
            </Box>
            {books.length > 0 && (
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Pagination
                  count={pagination?.totalPages}
                  page={pagination?.page || 1}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Stack>
            )}
          </>
        )}
      </Box>
      {editSelectedBook && (
        <EditBookModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          book={editSelectedBook}
          onSave={handleSave}
          setNotification={setNotification}
        />
      )}
      {deleteSelectedBook && (
        <DeleteBookModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          book={deleteSelectedBook}
          onDeleteSuccess={handleSave}
          setNotification={setNotification}
        />
      )}
      {/* Borrow Modal */}
      {borrowSelectedBook && borrowSelectedBook.available && (
        <BorrowBookModal
          open={isBorrowModalOpen}
          onClose={handleCloseBorrowModal}
          book={borrowSelectedBook}
          onBorrowSuccess={handleSave}
          setNotification={setNotification}
        />
      )}
      {/* Return Modal */}
      {borrowSelectedBook && !borrowSelectedBook.available && (
        <ReturnBookModal
          open={isReturnModalOpen}
          onClose={handleCloseReturnModal}
          book={borrowSelectedBook}
          onReturnSuccess={handleSave}
          setNotification={setNotification}
        />
      )}
      {/* Notification */}
      {notification && (
        <SnackBar
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Dashboard;
