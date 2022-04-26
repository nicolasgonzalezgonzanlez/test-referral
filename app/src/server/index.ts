import http from 'http';
import httpContext from 'express-http-context';
import cors from 'cors';
//Load configuration.
// @ts-ignore
const config_env = require('@telecom-argentina/config');
config_env.config();
// @ts-ignore
import express, { Application, Response as ExResponse, Request as ExRequest } from 'express';
import events from './events';
// Swagger
import swaggerUi from 'swagger-ui-express';
// Define routes and events
import routes, { options } from './routes';
import { config } from '../config';
import "reflect-metadata"


//Include middlewares.
const { traceabilityContext, token2Context, expressLogger } = require('@telecom-argentina/microservice-middlewares');

const {
  server: { port },
} = config;

// Start Express-js.
const app: Application = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware token verified
app.use(httpContext.middleware);
app.use(traceabilityContext);
app.use(token2Context);
app.use(expressLogger);


app.use('/', routes);
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  const Doc = swaggerUi.setup(await import('../../build/src/swagger.json'))

  return res.send(Doc)
})

// Start listen mode.
app.listen(port, async () => {
  events.onListen(port);
});

// Define server "special" event to handle situations.
server.on('error', events.onServerError);
process.on('SIGINT', () => events.onProcessKill(server));
process.on('SIGTERM', () => events.onProcessKill(server));
process.on('unhandledRejection', events.onException);
process.on('uncaughtException', (err) => events.onException(err));

export { app, server };
