import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { paginationMiddleware } from '../middleware/paginationMiddleware';

export const createBookRouter = (controller: BookController) => {
    const router = Router();
  
    router.get('/', paginationMiddleware, controller.getBooks);
    router.post('/', controller.addBook);
    router.put("/:id", controller.updateBook);
    router.delete("/:id", controller.deleteBook);
    router.patch("/:id/borrow", controller.borrowBook);
  
    return router;
};