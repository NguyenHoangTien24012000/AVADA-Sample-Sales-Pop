import Shopify from 'shopify-api-node';
import {initSyncOrderNotification} from '../repositories/NotificationRepository';

export default async function initSyncOrderFirstShop(shop, shopifyDomain) {
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const query = `{
        orders(first: 30) {
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
          id,
          product: {
            featuredImage: {url}
          }
        }
      } = edges[0];
      const shopId = shop.id;

      return initSyncOrderNotification({
        firstName,
        city,
        country,
        timestamp: new Date(createdAt),
        productId: parseInt(/[0-9]{10,}$/g.exec(id)[0]),
        productName: title,
        productImage: url,
        shopId,
        shopDomain: shopifyDomain
      });
    });
    await Promise.all(arrFuncSyncFirestore);
  } catch (error) {
    console.error(error);
  }
}