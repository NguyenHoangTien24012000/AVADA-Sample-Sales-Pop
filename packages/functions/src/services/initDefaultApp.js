import {initSettingDefault} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';

export default async function initDefaultApp(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    await initSettingDefault(shopifyDomain, shop.id);
  } catch (error) {
    console.error(error);
  }
}
