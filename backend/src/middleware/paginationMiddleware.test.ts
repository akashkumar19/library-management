import { paginationMiddleware } from './paginationMiddleware';
import { Request, Response, NextFunction } from 'express';

describe('paginationMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {};
    next = jest.fn();
  });

  it('should set default pagination values when no query parameters are provided', () => {
    paginationMiddleware(req as Request, res as Response, next);

    expect(req.pagination).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should correctly parse the page and perPage query parameters', () => {
    req.query = { page: '2', perPage: '20'}

    paginationMiddleware(req as Request, res as Response, next);

    expect(req.pagination).toEqual({
      page: 2,
      perPage: 20,
      offset: 20,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid page or perPage values', () => {
    req.query = {page: "invalid", perPage: "invalid"}

    paginationMiddleware(req as Request, res as Response, next);

    expect(req.pagination).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should handle edge case with page 0 and perPage set', () => {
    req.query = {page: "0", perPage: "20"}

    paginationMiddleware(req as Request, res as Response, next);

    expect(req.pagination).toEqual({
      page: 1,
      perPage: 20,
      offset: 0,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should handle large numbers for page and perPage', () => {
    req.query = {page: "1000", perPage: "500"}

    paginationMiddleware(req as Request, res as Response, next);

    expect(req.pagination).toEqual({
      page: 1000,
      perPage: 500,
      offset: 499500,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
