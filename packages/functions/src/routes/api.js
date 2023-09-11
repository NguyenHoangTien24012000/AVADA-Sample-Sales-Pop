import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import * as settingController from '../controllers/settingController';
import * as notificationController from '../controllers/notificationController';
import {getApiPrefix} from '@functions/const/app';
import validateSetting from '../middleware/validateSettings';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/notifications', notificationController.getNotifications);
  router.get('/settings', settingController.getSetting);
  router.put('/settings', validateSetting, settingController.updateSetting);

  return router;
}
