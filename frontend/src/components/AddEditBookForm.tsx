// AddEditBook.tsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Divider, MenuItem } from "@mui/material";
import { GENRES } from "../core/constants/genre";

interface AddEditBookFormProps {
  initialData?: {
    title: string;
    author: string;
    genre: string;
    isbn: string;
  };
  onSubmit: (
    data: { title: string; author: string; genre: string; isbn: string },
    setBooks: any
  ) => void;
}

const AddEditBookForm: React.FC<AddEditBookFormProps> = ({ initialData, onSubmit }) => {
  const genreList = GENRES;
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "",
    isbn: initialData?.isbn || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, setFormData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, margin: "auto" }}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required>
        {genreList.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="ISBN"
        name="isbn"
        value={formData.isbn}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default AddEditBookForm;
