const { errorHandler } = require('@telecom-argentina/microservice-middlewares');

import { authRestrict } from './authRestrict';
import notFound from './notFound';

const modules = { notFound, errorHandler, authRestrict };
export = modules;
