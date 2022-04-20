import { Request, Response, NextFunction } from 'express';
import { forbidden, unauthorized } from '../../constants/statusCode';
import jwt from 'jwt-simple';
import config from '../../config/index';
import dayjs from 'dayjs';


export const authRestrict = (req: Request, res: Response, next: NextFunction) => {
  // Extract the header.
  const { authorization } = req.headers;

  // Reject if the header is'nt present.
  if (!authorization) {
    res.status(forbidden).json({ message: 'Access denied' });
  }

  var token = req.headers.authorization ? req.headers.authorization?.split(" ")[1] : '';
  var payload = jwt.decode(token, config.axiosTuID.secret);

  if (payload.expiresAt <= dayjs().unix()) {
    return res.status(unauthorized).send({ message: "Expired token" });
  }



  next();
};

