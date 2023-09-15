import App from 'koa';
import cors from '@koa/cors';
import routes from '../routes/clientApi';
import * as errorService from '@functions/services/errorService';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
api.use(cors());

api.use(routes.allowedMethods());
api.use(routes.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
