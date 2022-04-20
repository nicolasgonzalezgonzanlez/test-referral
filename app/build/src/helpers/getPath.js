"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = exports.getPathFilename = void 0;
const path = require('path');
const package_json_1 = require("../../package.json");
const getPathFilename = (filename) => {
    return path.relative(process.cwd(), filename);
};
exports.getPathFilename = getPathFilename;
const getVersion = () => package_json_1.version;
exports.getVersion = getVersion;
