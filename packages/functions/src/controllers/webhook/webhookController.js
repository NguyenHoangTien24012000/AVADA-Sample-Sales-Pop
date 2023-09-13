import {addNotification} from '../../repositories/NotificationRepository';
import {orderWebHook} from '../../services/orderCreateWithWebHook';

export async function listenNewOrder(ctx) {
  try {
    const {admin_graphql_api_id} = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const dataNotification = await orderWebHook(shopifyDomain, admin_graphql_api_id);
    if (!dataNotification) {
      return null;
    }
    await addNotification(dataNotification);
  } catch (error) {
    console.error(error);
  }
}
