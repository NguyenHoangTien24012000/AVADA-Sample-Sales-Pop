import {initSettingDefault} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import syncOrderShop from './syncOrderShop';
//todo đặt tên afterInstall thì hợp lý hơn nhá
export default async function afterInstallApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const {id} = shop;
    await Promise.all([initSettingDefault(shopifyDomain, id), syncOrderShop(shopifyDomain, shop)]);
  } catch (error) {
    console.error(error);
  }
}
