import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { BookService } from "../services/BookService";

interface ReturnBookModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
  };
  onReturnSuccess: () => void;
  setNotification: (notification: any) => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({
  open,
  onClose,
  book,
  onReturnSuccess,
  setNotification,
}) => {
  const handleReturn = async () => {
    try {
      await BookService.returnBook(book.id);
      setNotification({
        type: "success",
        message: "Book returned successfully!",
      });
      onReturnSuccess(); // Refresh parent data
      onClose();
    } catch (error) {
      console.error("Error returning book:", error);
      setNotification({
        type: "error",
        message: "Error returning book",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="Return Book Modal" aria-describedby="Modal for returning a book">
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
          Return Book
        </Typography>
        <Typography align="center" marginBottom={2}>
          Are you sure you want to return <strong>{book.title}</strong>?
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
          <Button onClick={handleReturn} variant="contained" color="warning">
            Return
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReturnBookModal;
