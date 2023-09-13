import Shopify from 'shopify-api-node';
import {addNotification} from '../repositories/NotificationRepository';
import formatDataNotification from '../helpers/formatDataNotification';

const query = `{
  orders(first: 30, sortKey:UPDATED_AT) {
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

export default async function syncOrderShop(shopifyDomain, shop) {
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const data = await shopify.graphql(query);
    const dataResult = data?.orders.edges;
    if (!dataResult) {
      return null;
    }
    const arrSyncNotifications = dataResult.map(order => {
      const {node} = order;
      const shopId = shop.id;
      const dataNotification = formatDataNotification(node, shopId, shopifyDomain);
      if (!dataNotification) {
        return null;
      }
      return addNotification(dataNotification);
    });
    await Promise.all(arrSyncNotifications);
  } catch (error) {
    console.error(error);
  }
}
