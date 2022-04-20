import { Request, Response, NextFunction } from 'express';
import { responseDto, applicationMessageTypeDto } from '../../../dtos/common';
import validator from '../../../helpers/validate';

const errorParser = (err: any, customMessage?: object): any => {
  let k = typeof err === 'object' ? Object.keys(err.errors) : '';
  let arr: any[] = [];
  Object.values(err.errors).forEach((e, i) => {
    let key = k[i];
    let message = `${e}`;
    if(customMessage && customMessage.hasOwnProperty(key)){
      message = customMessage[key];
    }

    arr.push({
      key,
      message,
      messageType: applicationMessageTypeDto.Error,
    });
  });
  return arr;
};
export const customValidator = (req: Request, res: Response, next: NextFunction, rules: any, customMessage?: object) => {
  validator(req.body, rules, {}, (err: any, status: any) => {
    if (!status) {
      let response = new responseDto(errorParser(err, customMessage));
      response.isValid = false;
      res.status(412).send(response);
    } else {
      next();
    }
  });
};
export const customValidatorForData = (data: any, res: Response, next: NextFunction, rules: any) => {
  validator(data, rules, {}, (err: any, status: any) => {
    if (!status) {
      let response = new responseDto(errorParser(err));
      response.isValid = false;
      res.status(412).send(response);
    } else {
      next();
    }
  });
};
