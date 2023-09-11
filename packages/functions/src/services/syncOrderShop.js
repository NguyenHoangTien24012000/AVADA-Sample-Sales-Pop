import Shopify from 'shopify-api-node';
import {addOrder} from '../repositories/NotificationRepository';

export default async function syncOrderShop(shop, shopifyDomain) {
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    //todo chỗ này mình lấy order mới nhấ nên có sort UPDATED_AT, có thể đảo chiều nhờ biến reverse nhé
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
    const data = await shopify.graphql(query);
    const arrFuncSyncFirestore = data.orders.edges.map(order => {
      //todo lấy biến ntn nên check trc giá trị nhé ko bị undefined là chạy vào err luôn ấy
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
      if (!firstName || !city || !country || !title || !id || !url || !createdAt) {
        console.error('Dữ liệu không hợp lệ trong order:', order);
        return null;
      }

      return addOrder({
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
