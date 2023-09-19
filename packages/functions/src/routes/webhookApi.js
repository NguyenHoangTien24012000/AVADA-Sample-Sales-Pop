import Router from 'koa-router';
import * as notificationController from '../controllers/notificationController';

const router = new Router({
  prefix: '/webhook'
});

router.post('/order/new', notificationController.addNotification);

export default router;
