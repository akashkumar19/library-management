import { Box } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
    sx={{
        backgroundColor: '#f5f5f5', 
        color: '#333',  
        padding: '20px 0',
        marginTop: '5px',  
        position: 'relative',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h3 style={{ margin: "0", fontWeight: "bold" }}>Library Management System</h3>
        <p style={{ margin: "5px 0" }}>Your gateway to organized knowledge!</p>
      </div>
    </Box>
  );
};

export default Footer;
