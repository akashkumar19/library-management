import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Book } from "../models";
import { BookService } from "../services/BookService";
import AddEditBookForm from "./AddEditBookForm";

interface EditBookModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    author: string;
    genre: string;
    isbn: string;
  };
  onSave: () => void;
  setNotification: React.Dispatch<
    React.SetStateAction<{ type: string; message: string } | null>
  >;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  open,
  onClose,
  book,
  onSave,
  setNotification,
}) => {
  const handleSubmit = async (formData: Partial<Book>) => {
    try {
      await BookService.updateBook(book.id, formData);
      setNotification({
        type: "success",
        message: "Book updated successfully!",
      });
      onSave(); // Refresh parent data
      onClose();
    } catch (error: any) {
      console.error("Error updating book:", error);
      setNotification({
        type: "error",
        message: error.response.data.details,
      });
    }
  };
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="Edit Book Modal"
  aria-describedby="Modal for editing a book">
        <Box
          sx={{
            maxWidth: 500,
            margin: "auto",
            padding: 2,
            mt: 5,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}>
          <Typography variant="h6" align="center" marginBottom={2}>
            Edit Book
          </Typography>
          <AddEditBookForm initialData={book} onSubmit={handleSubmit} />
        </Box>
      </Modal>
    </>
  );
};

export default EditBookModal;
