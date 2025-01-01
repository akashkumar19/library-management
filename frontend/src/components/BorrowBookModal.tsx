import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { BookService } from "../services/BookService";

interface BorrowBookModalProps {
  open: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
  };
  onBorrowSuccess: () => void;
  setNotification: React.Dispatch<
    React.SetStateAction<{ type: string; message: string } | null>
  >;
}

const BorrowBookModal: React.FC<BorrowBookModalProps> = ({
  open,
  onClose,
  book,
  onBorrowSuccess,
  setNotification,
}) => {
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [borrowerPhone, setBorrowerPhone] = useState("");

  const handleBorrow = async () => {
    try {
      await BookService.borrowBook(book.id, {
        name: borrowerName,
        email: borrowerEmail,
        phone: borrowerPhone,
      });
      setNotification({
        type: "success",
        message: `Congratulations ${borrowerName}! You have successfully borrowed ${book.title}.`,
      });
      onBorrowSuccess(); // Refresh parent data
      onClose();
    } catch (error) {
      console.error("Error borrowing book:", error);
      setNotification({
        type: "error",
        message: "Error borrowing book",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="Borrow Book Modal" aria-describedby="Modal for borrowing a book">
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
          Borrow Book
        </Typography>
        <Typography align="center" marginBottom={2}>
          Enter your details to borrow <strong>{book.title}</strong>.
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={borrowerEmail}
          onChange={(e) => setBorrowerEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone"
          fullWidth
          value={borrowerPhone}
          onChange={(e) => setBorrowerPhone(e.target.value)}
          margin="normal"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBorrow} variant="contained" color="success">
            Borrow
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BorrowBookModal;
