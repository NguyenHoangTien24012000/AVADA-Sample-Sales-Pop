import {addSetting} from '../../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import syncOrderShop from './syncOrderShop';
import registerWebhook from './registerWebhook';

export default async function afterInstallApp(ctx) {
  const shopifyDomain = ctx.state.shopify.shop;
  const shop = await getShopByShopifyDomain(shopifyDomain);
  await Promise.all([addSetting(shop), syncOrderShop(shop), registerWebhook(shop)]);
}
