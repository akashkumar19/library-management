import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AddBook } from "./pages/AddBook";
import BorrowedBooks from "./pages/BorrowedBooks";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/borrowed-books" element={<BorrowedBooks />} />
    </Routes>
  );
};
