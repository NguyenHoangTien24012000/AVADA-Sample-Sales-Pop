import {initSettingDefault} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import syncOrderShop from './syncOrderShop';
import registerWebhook from './registerWebhook';

export default async function afterInstallApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const {id} = shop;
    await Promise.all([
      initSettingDefault(shopifyDomain, id),
      syncOrderShop(shopifyDomain, shop),
      registerWebhook(shopifyDomain, shop)
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
