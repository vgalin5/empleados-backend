import serverlessExpress from 'aws-serverless-express';
import app from './app'; // este es tu archivo Express donde defines rutas

const server = serverlessExpress.createServer(app);

exports.handler = (event: any, context: any) => {
  serverlessExpress.proxy(server, event, context);
};
