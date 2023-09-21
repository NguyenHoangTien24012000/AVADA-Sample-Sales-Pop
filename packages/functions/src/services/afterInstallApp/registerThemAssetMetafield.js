import createShopifyNodeApi from '../../const/shopifyNodeApi';
import createAssetSimpleSalePop from '../shopifyApi/createAsset';
import createMetafieldsSimpleSalePop from '../shopifyApi/createMetafileds';

export default async function registerOnlineStoreThemAssetMetafield(shop) {
  const shopify = createShopifyNodeApi(shop);
  Promise.all([createAssetSimpleSalePop(shopify), createMetafieldsSimpleSalePop(shop, shopify)]);
}
