import { Route, Routes } from "react-router-dom";
import { AddBook } from "./pages/AddBook";
import BorrowedBooks from "./pages/BorrowedBooks";
import Dashboard from "./pages/Dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/borrowed-books" element={<BorrowedBooks />} />
    </Routes>
  );
};
