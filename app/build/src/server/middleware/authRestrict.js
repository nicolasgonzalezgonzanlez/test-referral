"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRestrict = void 0;
const statusCode_1 = require("../../constants/statusCode");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const index_1 = __importDefault(require("../../config/index"));
const dayjs_1 = __importDefault(require("dayjs"));
const authRestrict = (req, res, next) => {
    var _a;
    // Extract the header.
    const { authorization } = req.headers;
    // Reject if the header is'nt present.
    if (!authorization) {
        res.status(statusCode_1.forbidden).json({ message: 'Access denied' });
    }
    var token = req.headers.authorization ? (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1] : '';
    var payload = jwt_simple_1.default.decode(token, index_1.default.axiosTuID.secret);
    if (payload.expiresAt <= (0, dayjs_1.default)().unix()) {
        return res.status(statusCode_1.unauthorized).send({ message: "Expired token" });
    }
    next();
};
exports.authRestrict = authRestrict;
