import { Request, Response, NextFunction } from 'express';
import { forbidden } from '../../constants/statusCode';


export const authRestrict = (req: Request, res: Response, next: NextFunction) => {
  // Extract the header.
  const { authorization } = req.headers;

  // Reject if the header is'nt present.
  if (!authorization) {
    res.status(forbidden).json({ message: 'Access denied' });
  }

  next();
};

