import Shopify from 'shopify-api-node';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initSyncOrder} from '../repositories/notificationRepository';
export default async function initSyncOrderFirstShop(ctx) {
  try {
    const {shopifyDomain} = ctx.state.user.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const query = `{
        orders(first: 2) {
          edges {
            node {
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
                    product {
                      id
                      featuredImage {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`;
    const data = await shopify.graphql(query);
    const arrFuncSyncFirestore = data.orders.edges.map(order => {
      const {
        node: {
          billingAddress: {firstName, city, country},
          createdAt,
          lineItems: {edges}
        }
      } = order;
      const {
        node: {
          title,
          product: {
            id,
            featuredImage: {url}
          }
        }
      } = edges[0];
      const shopId = shop.id;
      return initSyncOrder({
        firstName,
        city,
        country,
        createdAt,
        id,
        url,
        title,
        shopId,
        shopDomain: shopifyDomain
      });
    });
    await Promise.all(arrFuncSyncFirestore);
  } catch (error) {
    console.error(error);
  }
}
