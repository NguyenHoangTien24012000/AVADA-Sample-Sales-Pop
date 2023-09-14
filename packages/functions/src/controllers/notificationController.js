import {getCurrentShop} from '../helpers/auth';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import * as notificationRepository from '../repositories/notificationRepository';
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
    const shopId = shop.id;
    const data = await notificationRepository.getNotificationsClientApi(shopId);
    return (ctx.body = {
      success: true,
      data
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: {}
    });
  }
}
