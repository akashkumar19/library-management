import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
import React from "react";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  available: boolean;
  borrowerName?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onBorrowOrReturn: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  genre,
  isbn,
  available,
  borrowerName,
  onEdit,
  onDelete,
  onBorrowOrReturn,
}) => {
  return (
    <Card
      sx={{
        padding: "16px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 10,
          transform: "scale(1.05)",
        },
      }}>
      <CardContent>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: "8px" }}>
          {title}
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: "4px" }}>
          <strong>Author:</strong> {author}
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: "4px" }}>
          <strong>Genre:</strong>{" "}
          <span
            style={{
              backgroundColor: "#e0f7fa",
              color: "#00796b",
              padding: "4px 8px",
              borderRadius: "16px",
            }}>
            {genre}
          </span>
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: "4px" }}>
          <strong>ISBN:</strong> {isbn}
        </Typography>
        <Typography
          style={{
            color: available ? "#22bb33" : "#d32f2f",
            marginTop: "8px",
          }}>
          {available ? "Available" : `Borrowed by ${borrowerName || "N/A"}`}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between", padding: "16px" }}>
        <Button size="small" color="primary" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button
          size="small"
          color={available ? "success" : "warning"}
          onClick={() => onBorrowOrReturn(id)}>
          {available ? "Borrow" : "Return"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
