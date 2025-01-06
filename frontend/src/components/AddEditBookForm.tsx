import { Box, Divider, MenuItem, TextField } from "@mui/material";
import { Button } from "@progress/kendo-react-buttons";
import React, { useState } from "react";
import { GENRES } from "../core/constants/genre";
import { BookProps } from "../models";
import { validateField, validateForm, hasErrors } from "../core/utils/validationUtils";


interface AddEditBookFormProps {
  initialData?: BookProps;
  onSubmit: (
    data: BookProps,
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

  const [errors, setErrors] = useState<BookProps>({
    title: '',
    author: '',
    genre: '',
    isbn: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (!hasErrors(newErrors)) {
      onSubmit(formData, setFormData);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          error={!!errors.title}
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={errors.title}
        />
        <TextField
          error={!!errors.author}
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={errors.author}
        />
        <TextField
          error={!!errors.genre}
          select
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={errors.genre}>
          {genreList.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          error={!!errors.isbn}
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          helperText={errors.isbn}
        />
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Button size="large" type="submit" fillMode={"solid"} style={{ width: '100%', backgroundColor: "#1976d2", color: "#fff" }} aria-label="Submit to add book">
          SUBMIT
        </Button>
      </Box>
    </form>
  );
};

export default AddEditBookForm;