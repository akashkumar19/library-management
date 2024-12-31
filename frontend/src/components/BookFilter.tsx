import { Box, TextField, MenuItem, Button, debounce } from "@mui/material";
import React, { useState, useCallback } from "react";
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

  const [localFilters, setLocalFilters] = useState(filters);

  const debouncedTransmitFilters = useCallback(
    debounce((updatedFilters: typeof localFilters) => {
      Object.entries(updatedFilters).forEach(([key, value]) => {
        handleFilterChange({
          target: { name: key, value } as HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>);
      });
    }, 500),
    [handleFilterChange]
  );

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update local state
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);

    // Trigger debounced transmission to parent
    debouncedTransmitFilters(updatedFilters);
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {
      search: "",
      author: "",
      genre: "",
      availability: "",
    };

    setLocalFilters(clearedFilters);
    handleClearFilters();
  };

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
        value={localFilters.search}
        onChange={handleLocalChange}
        sx={{
          flex: "1 1 200px",
          minWidth: "200px",
        }}
      />
      <TextField
        name="author"
        label="Author"
        variant="outlined"
        value={localFilters.author}
        onChange={handleLocalChange}
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
        value={localFilters.genre}
        onChange={handleLocalChange}
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
        value={localFilters.availability}
        onChange={handleLocalChange}
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
        onClick={handleClearAllFilters}
        sx={{ height: "fit-content" }}>
        Clear All
      </Button>
    </Box>
  );
};

export default BookFilter;
