import { Box, Divider, MenuItem, TextField } from "@mui/material";
import { Button } from "@progress/kendo-react-buttons";
import React, { useState } from "react";
import { GENRES } from "../core/constants/genre";
import { BookProps } from "../models";

interface AddEditBookFormProps {
  initialData?: BookProps;
  onSubmit: (
    data: BookProps,
    setBooks: any
  ) => void;
}

const ERROR_MESSAGE = 'Field is required';
const AddEditBookForm: React.FC<AddEditBookFormProps> = ({ initialData, onSubmit }) => {
  const genreList = GENRES;
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "",
    isbn: initialData?.isbn || "",
  });

  const [error, setError] = useState<BookProps>({
    title: '',
    author: '',
    genre: '',
    isbn: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: value === '' ? ERROR_MESSAGE : ''}))
  };

  const validateForm = () => {
    const newError = {
      title: '',
      author: '',
      genre: '',
      isbn: ''
    }
    if (!formData.title.trim()) {
      newError.title = ERROR_MESSAGE
    }
    if (!formData.author.trim()) {
      newError.author = ERROR_MESSAGE
    }
    if (!formData.genre.trim()) {
      newError.genre = ERROR_MESSAGE
    }
    if (!formData.isbn.trim()) {
      newError.isbn = ERROR_MESSAGE
    }
    setError(newError);
    return !Object.values(formData).some((val)=>(val === ''))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()) {
      onSubmit(formData, setFormData);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          error={!!error.title}
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={error.title}
        />
        <TextField
          error={!!error.author}
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={error.author}
        />
        <TextField
          error={!!error.genre}
          select
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={error.genre}>
          {genreList.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          error={!!error.isbn}
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={error.isbn}
        />
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Button size="large" type="submit" fillMode={"solid"} style={{ width: '100%', backgroundColor: "#1976d2", color: "#fff" }}>
          SUBMIT
        </Button>
      </Box>
    </form>
  );
};

export default AddEditBookForm;