"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Health controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const health = (req, res) => {
    res.status(200).json({ health: 'OK' });
};
exports.default = health;
