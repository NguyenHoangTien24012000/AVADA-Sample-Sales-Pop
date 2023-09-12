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
    //todo chỗ này mình lấy order mới nhấ nên có sort UPDATED_AT, có thể đảo chiều nhờ biến reverse nhé

    const data = await shopify.graphql(query);
    const orders = data.orders;
    orders.edges.map(order => {
      //todo lấy biến ntn nên check trc giá trị nhé ko bị undefined là chạy vào err luôn ấy
      const {node} = order;
      const shopId = shop.id;
      const dataNotification = formatDataNotification(node, shopId, shopifyDomain);
      if (!dataNotification) {
        return null;
      }
      return addNotification(dataNotification);
    });
    await Promise.all(arrFuncSyncFirestore);
  } catch (error) {
    console.error(error);
  }
}
