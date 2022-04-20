import process from 'process';
import { Server } from 'http';
import { TEnv } from '../config/types';
import { messages } from '../constants/log';

const logger = require('@telecom-argentina/logger');

const pkg = require('../../package.json');

// On server internal error.
const onServerError = (): void => logger.error({ message: `Server error` });

// On server start.
const onListen = (port: TEnv): void => {
  logger.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name}`);
  logger.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
};

// When the process receive kill signal.
const onProcessKill = (server: Server): void => {
  logger.info(messages.events.info.onProcessKillMessage);

  setTimeout(() => {
    logger.info(messages.events.info.finishServer);
    server.close(() => process.exit(0));
  }, 180);
};

// When in the server happen a uncaugth exception.
const onException = (err: any): void => logger.error({ message: err });

const modules = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};

export = modules;
