import {getCurrentShop} from '../helpers/auth';
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
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      data: {},
      message: error
    });
  }
}
