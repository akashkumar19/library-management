import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { BookService } from "../services/BookService";

interface DeleteBookModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
  };
  onDeleteSuccess: () => void;
  setNotification: (notification: any) => void;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  open,
  onClose,
  book,
  onDeleteSuccess,
  setNotification,
}) => {
  const handleDelete = async () => {
    try {
      await BookService.deleteBook(book.id);
      setNotification({
        type: "success",
        message: "Book deleted successfully!",
      });
      onDeleteSuccess(); // Refresh parent data
      onClose(); // Close the modal
    } catch (error) {
      console.log("Error deleting book:", error);
      setNotification({
        type: "error",
        message: "Error deleting book",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 2,
          mt: 5,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}>
        <Typography variant="h6" align="center" marginBottom={2}>
          Confirm Delete
        </Typography>
        <Typography align="center" marginBottom={2}>
          Are you sure you want to delete the book <strong>{book.title}</strong>
          ?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteBookModal;
