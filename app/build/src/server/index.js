"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const http_1 = __importDefault(require("http"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const cors_1 = __importDefault(require("cors"));
//Load configuration.
// @ts-ignore
const config_env = require('@telecom-argentina/config');
config_env.config();
// @ts-ignore
const express_1 = __importDefault(require("express"));
const events_1 = __importDefault(require("./events"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Define routes and events
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("../config"));
const swaggerDocument = require('../swagger.json');
//Include middlewares.
const { traceabilityContext, token2Context, expressLogger } = require('@telecom-argentina/microservice-middlewares');
const { server: { port }, } = config_1.default;
// Start Express-js.
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
let origin = ['*'];
if (config_1.default.corsUrls) {
    origin = config_1.default.corsUrls.toString().split(',');
}
let corsOptions = {
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Middleware token verified
app.use(express_http_context_1.default.middleware);
app.use(traceabilityContext);
app.use(token2Context);
app.use(expressLogger);
swaggerDocument.host = config_1.default.internalApiUrl;
app.use('/docs', swagger_ui_express_1.default.serve);
app.get('/docs', swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', routes_1.default);
// Start listen mode.
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    events_1.default.onListen(port);
}));
// Define server "special" event to handle situations.
server.on('error', events_1.default.onServerError);
process.on('SIGINT', () => events_1.default.onProcessKill(server));
process.on('SIGTERM', () => events_1.default.onProcessKill(server));
process.on('unhandledRejection', events_1.default.onException);
process.on('uncaughtException', (err) => events_1.default.onException(err));
