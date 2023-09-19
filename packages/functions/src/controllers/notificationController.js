import {getCurrentShop} from '../helpers/auth';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import * as notificationRepository from '../repositories/notificationRepository';
import * as settingRepository from '../repositories/settingRepository';
import {getOrderNew} from '../services/shopifyApi/getOrderNew';

export async function getNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const objQuery = ctx.query;
    const {data, hasNext, hasPre} = await notificationRepository.getNotifications(shopId, objQuery);
    return (ctx.body = {
      success: true,
      data,
      pageInfo: {hasNext, hasPre}
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: {},
      message: error
    });
  }
}

export async function getNotificationsClientApi(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const {id} = shop;
    const setting = await settingRepository.getSetting(id);
    const {maxPopsDisplay} = setting;
    const notifications = await notificationRepository.getNotificationsClientApi(
      id,
      maxPopsDisplay
    );
    return (ctx.body = {
      success: true,
      data: {
        notifications,
        setting
      }
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: {}
    });
  }
}

export async function addNotification(ctx) {
  try {
    const {admin_graphql_api_id} = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const dataNotification = await getOrderNew(shopifyDomain, admin_graphql_api_id);
    if (!dataNotification) {
      return null;
    }
    await notificationRepository.addNotification(dataNotification);
    return (ctx.body = {
      success: true
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false
    });
  }
}
