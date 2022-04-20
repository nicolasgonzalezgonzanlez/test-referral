import { Request } from 'express';

interface CustomBodyRequest<T> extends Request {
    body: T
}

export { CustomBodyRequest}