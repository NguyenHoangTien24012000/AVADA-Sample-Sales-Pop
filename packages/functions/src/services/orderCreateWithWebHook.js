import {getShopByShopifyDomain} from '@avada/shopify-auth';
import formatDataNotification from '../helpers/formatDataNotification';
import Shopify from 'shopify-api-node';

export async function orderWebHook(shopifyDomain, paramQueryOrder) {
  try {
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const query = `{
            order(id: "${paramQueryOrder}") {
              id
              createdAt
              billingAddress {
                firstName
                city
                country
              }
              lineItems(first: 1) {
                edges {
                  node {
                    title
                    id
                    product {
                      featuredImage {
                        url
                      }
                    }
                  }
                }
              }
            }
          }`;
    const data = await shopify.graphql(query);
    const {order} = data;
    const shopId = shop.id;
    const dataNotification = formatDataNotification(order, shopId, shopifyDomain);
    return dataNotification;
  } catch (error) {
    console.error(error);
  }
}
