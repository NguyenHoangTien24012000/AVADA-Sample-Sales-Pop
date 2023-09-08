import {initSettingDefault} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import initSyncOrderFirstShop from './initSyncOrderFirstShop';
export default async function initDefaultApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    await Promise.all([
      initSettingDefault(shopifyDomain, shop.id),
      initSyncOrderFirstShop(shop, shopifyDomain)
    ]);
  } catch (error) {
    console.error(error);
  }
}
