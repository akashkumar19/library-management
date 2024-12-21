import { Divider } from "@mui/material";
import React from "react";

interface NoBooksMessageProps {
  onClearFilters?: () => void; // Optional prop for clearing filters
}

const NoBooksMessage: React.FC<NoBooksMessageProps> = ({ onClearFilters }) => (
  <div
    style={{
      textAlign: "center",
      marginTop: "20px",
      fontSize: "18px",
      color: "#555",
      lineHeight: "1.6",
    }}>
    <span style={{ fontSize: "24px" }}>📚</span>
    <h3 style={{ fontSize: "22px", margin: "10px 0" }}>No Books Found</h3>
    <p>
      It seems like there are no books available at the moment. This could be
      because of the filters you've applied or there are currently no books in
      the library database.
    </p>
    <p style={{ margin: "20px 0", fontSize: "16px" }}>💡 You can:</p>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        fontSize: "16px",
        textAlign: "left",
        display: "inline-block",
      }}>
      <li>➡️ Try clearing or adjusting the filters.</li>
      <li>➡️ Add new books to the library.</li>
    </ul>
    <Divider
      orientation="horizontal"
      variant="middle"
      flexItem
      sx={{ marginTop: 2, marginBottom: 2 }}
    />
    {onClearFilters && (
      <button
        onClick={onClearFilters}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Clear Filters
      </button>
    )}
  </div>
);

export default NoBooksMessage;
