import { Box, TextField, MenuItem, Button } from "@mui/material";
import React from "react";
import { GENRES } from "../core/constants/genre";

interface BookFilterProps {
  filters: {
    search: string;
    author: string;
    genre: string;
    availability: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFilters: () => void;
}

const BookFilter = ({
  filters,
  handleFilterChange,
  handleClearFilters,
}: BookFilterProps) => {
  const genreList = GENRES;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: 2,
        marginBottom: 3,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}>
      <TextField
        name="search"
        label="Search"
        variant="outlined"
        value={filters.search}
        onChange={handleFilterChange}
        sx={{
          flex: "1 1 200px",
          minWidth: "200px",
        }}
      />
      <TextField
        name="author"
        label="Author"
        variant="outlined"
        value={filters.author}
        onChange={handleFilterChange}
        sx={{
          flex: "1 1 200px",
          minWidth: "200px",
        }}
      />
      <TextField
        select
        name="genre"
        label="Genre"
        variant="outlined"
        value={filters.genre}
        onChange={handleFilterChange}
        sx={{
          flex: "1 1 200px",
          minWidth: "200px",
        }}>
        {genreList.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        name="availability"
        label="Availability"
        variant="outlined"
        value={filters.availability}
        onChange={handleFilterChange}
        sx={{
          flex: "1 1 200px",
          minWidth: "200px",
        }}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="true">Available</MenuItem>
        <MenuItem value="false">Borrowed</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearFilters}
        sx={{ height: "fit-content" }}>
        Clear All
      </Button>
    </Box>
  );
};

export default BookFilter;
