import createShopifyNodeApi from '../../const/shopifyNodeApi';
import appConfig from '../../config/app';

export default async function registerWebhook(shop) {
  const {baseUrl} = appConfig;
  try {
    const shopify = createShopifyNodeApi(shop);
    const urlRegister = 'https://' + baseUrl + '/webhook/order/new';
    const webHooks = await shopify.webhook.list();
    const hasWebhook = webHooks.find(
      webHook => webHook.topic === 'orders/create' && webHook.address === urlRegister
    );
    if (!!hasWebhook) {
      console.info('Webhook already exists!');
      return null;
    }

    await shopify.webhook.create({
      address: urlRegister,
      topic: 'orders/create'
    });
    console.info('Webhook register success!', urlRegister);
    return null;
  } catch (error) {
    console.error('ERROR REGISTER WEBHOOK', error);
    return null;
  }
}
