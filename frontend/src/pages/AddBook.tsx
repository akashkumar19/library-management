import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Notification } from "@progress/kendo-react-notification";
import React, { useState } from "react";
import AddEditBookForm from "../components/AddEditBookForm";
import { Book } from "../models";
import { BookService } from "../services/BookService";

export const AddBook: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const handleSubmit = async (book: Partial<Book>, setBooks: any) => {
    try {
      await BookService.addBook(book);
      setBooks({
        title: "",
        author: "",
        genre: "",
        isbn: "",
      });

      setNotification({
        type: "success",
        message: "Book created successfully!",
      });
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
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          margin: "auto",
          borderRadius: 3,
          boxShadow: 2,
          backgroundColor: "background.paper",
          padding: "1.5rem",
          marginTop: "2rem",
        }}>
        <Typography variant="h4" align="center" marginBottom={2}>
          Add Book
        </Typography>
        <AddEditBookForm onSubmit={handleSubmit} />
      </Paper>
      {notification && (
        <Notification
          type={{
            style: notification.type === "success" ? "success" : "error",
            icon: true,
          }}
          closable={true}
          onClose={() => setNotification(null)}
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            zIndex: 1000,
          }}>
          <Typography>{notification.message}</Typography>
        </Notification>
      )}
    </>
  );
};
