import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
      interface Request {
        pagination: {
          page: number,
          perPage: number,
          offset: number
        }
      }
  }
}

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  const offset = (page - 1) * perPage;

  req.pagination = { page, perPage, offset }

  next();
};
