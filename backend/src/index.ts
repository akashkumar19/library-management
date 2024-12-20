import cors from "cors";
import express from "express";
import { initializeDatabase } from "./config/database";
import { BookController } from "./controllers/bookController";
import { createBookRouter } from "./routes/bookRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  const db = await initializeDatabase();

  const bookController = new BookController(db);

  app.use("/api/books", createBookRouter(bookController));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
