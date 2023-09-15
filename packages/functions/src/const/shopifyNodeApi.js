import Shopify from 'shopify-api-node';

function createShopifyNodeApi(shop) {
  const {shopifyDomain, accessToken} = shop;
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
  return shopify;
}

export default createShopifyNodeApi;
