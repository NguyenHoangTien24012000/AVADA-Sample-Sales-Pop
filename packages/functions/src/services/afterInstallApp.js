import {initSettingDefault} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import syncOrderShop from './syncOrderShop';
//todo đặt tên afterInstall thì hợp lý hơn nhá
export default async function afterInstallApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    await Promise.all([
      initSettingDefault(shopifyDomain, shop.id),
      syncOrderShop(shop, shopifyDomain)
    ]);
  } catch (error) {
    console.error(error);
  }
}
