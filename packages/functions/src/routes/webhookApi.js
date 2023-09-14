import Router from 'koa-router';
import * as webhookController from '../controllers/webhook/webhookController';

const router = new Router({
  prefix: '/webhook'
});
router.get('/test', ctx => {
  return (ctx.body = {
    success: true,
    data: [2, 3, 4]
  });
});
router.post('/order/new', webhookController.listenNewOrder);

export default router;
