import Shopify from 'shopify-api-node';
import appConfig from '../config/app';

export default async function registerWebhook(shopifyDomain, shop) {
  const {baseUrl} = appConfig;
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const urlRegister = 'https://' + baseUrl + '/webhook/order/new';
    const webHooks = await shopify.webhook.list();
    const index = webHooks.findIndex(
      webHook => webHook.topic === 'orders/create' && webHook.address === urlRegister
    );
    if (index !== -1) {
      console.info('Webhook already exists!');
      return;
    }

    await shopify.webhook.create({
      address: urlRegister,
      topic: 'orders/create'
    });
  } catch (error) {
    console.error('ERROR REGISTER WEBHOOK', error);
  }
}
