import React from "react";
import {
  Typography
} from "@mui/material";
import { Card, CardHeader, CardBody, CardActions } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";

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
      style={{
        width: "300px",
        padding: "16px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        transition: "transform 0.3s ease-in-out",
        marginBottom: "16px",
      }}
      onMouseEnter={(e: { currentTarget: { style: { transform: string; boxShadow: string; } }}) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 4px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e: { currentTarget: { style: { transform: string; boxShadow: string; } }}) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 2px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <CardHeader>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            {title}
          </Typography>
      </CardHeader>

      <CardBody>
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
            }}
          >
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
          }}
        >
          {available ? "Available" : `Borrowed by ${borrowerName || "N/A"}`}
        </Typography>
      </CardBody>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button
          size="medium"
          themeColor={"tertiary"}
          fillMode="flat"
          onClick={() => onEdit(id)}
          style={{ marginRight: "8px" }}
        >
          EDIT
        </Button>
        <Button
          size="medium"
          themeColor={"error"}
          fillMode="flat"
          onClick={() => onDelete(id)}
          style={{ marginRight: "8px" }}
        >
          DELETE
        </Button>
        <Button
          size="medium"
          fillMode="flat"
          themeColor={available ? "success" : "warning"}
          onClick={() => onBorrowOrReturn(id)}
        >
          {available ? "BORROW" : "RETURN"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
