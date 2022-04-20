import { Request, Response, NextFunction } from 'express';
import { customValidator } from './validator';

const getUserValidation = (req: Request, res: Response, next: NextFunction) => {

    const validationRule = {
        "user_name": "max:150",
        "email": "max:200|email",
    }

    customValidator(req, res, next, validationRule);
};

export = getUserValidation;
