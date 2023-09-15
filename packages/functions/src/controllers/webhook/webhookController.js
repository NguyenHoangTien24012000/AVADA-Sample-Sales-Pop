import {addNotification} from '../../repositories/notificationRepository';
import {getOrderNew} from '../../services/shopifyApi/getOrderNew';

export async function listenNewOrder(ctx) {
  try {
    const {admin_graphql_api_id} = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const dataNotification = await getOrderNew(shopifyDomain, admin_graphql_api_id);
    if (!dataNotification) {
      return null;
    }
    await addNotification(dataNotification);
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
