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

const ERROR_MESSAGE = 'Field is required';

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
  })
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [borrowerPhone, setBorrowerPhone] = useState("");
  const [error, setError] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: value === '' ? ERROR_MESSAGE : ''}));
  }
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validateForm = async() => {
    const newError = {
      name: '',
      email: ''
    }
    if(formData.name === '') {
      newError.name = ERROR_MESSAGE;
    }
    if(formData.email === '') {
      newError.email = ERROR_MESSAGE;
    }
    if(formData.email !== '' && !validateEmail(formData.email)) {
      newError.email = 'Email ID is not valid'
    }
    setError(newError);
    return !Object.values(newError).some((val)=>(val !== ''))
  }

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if(await validateForm()) {
      try {
        await BookService.borrowBook(book.id, {
          ...formData
        });
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
      <form onSubmit={handleBorrow} noValidate>

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
          error={!!error.name}
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          helperText={error.name}
          required
        />
        <TextField
          error={!!error.email}
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          type="email"
          helperText={error.email}
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
