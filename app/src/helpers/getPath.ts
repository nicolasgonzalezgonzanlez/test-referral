const path = require('path');
import { version } from '../../package.json';

const getPathFilename = (filename: string) => {
  return path.relative(process.cwd(), filename);
};

const getVersion = () => version;

export { getPathFilename, getVersion };
