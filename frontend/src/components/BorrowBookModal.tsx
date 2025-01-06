import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { BookService } from "../services/BookService";
import { validateField, validateForm, hasErrors, validateEmail } from "../core/utils/validationUtils";

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email ID is not valid';
    }
    setErrors(newErrors);

    if (!hasErrors(newErrors)) {
      try {
        await BookService.borrowBook(book.id, formData);
        setNotification({
          type: "success",
          message: `Congratulations ${formData.name}! You have successfully borrowed ${book.title}.`,
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
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="Borrow Book Modal" aria-describedby="Modal for borrowing a book">
      <form onSubmit={handleSubmit} noValidate>
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 2,
            mt: 5,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" align="center" marginBottom={2}>
            Borrow Book
          </Typography>
          <Typography align="center" marginBottom={2}>
            Enter your details to borrow <strong>{book.title}</strong>.
          </Typography>
          <TextField
            error={!!errors.name}
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            helperText={errors.name}
            required
          />
          <TextField
            error={!!errors.email}
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            helperText={errors.email}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
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
            <Button type="submit" variant="contained" color="success">
              Borrow
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default BorrowBookModal;