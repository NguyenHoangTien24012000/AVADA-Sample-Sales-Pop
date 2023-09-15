import {addSetting} from '../../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import syncOrderShop from './syncOrderShop';
import registerWebhook from './registerWebhook';
import registerScripttag from './registerScripttag';

export default async function afterInstallApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    await Promise.all([
      addSetting(shop),
      syncOrderShop(shop),
      registerWebhook(shop),
      registerScripttag(shop)
    ]);
    return (ctx.body = {
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false
    });
  }
}
