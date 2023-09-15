import {getShopByShopifyDomain} from '@avada/shopify-auth';
import parseNotificationDataGraphql from '../../helpers/parseNotificationDataGraphql';
import createShopifyNodeApi from '../../const/shopifyNodeApi';

export async function getOrderNew(shopifyDomain, paramQueryOrder) {
  const shop = await getShopByShopifyDomain(shopifyDomain);
  const shopify = createShopifyNodeApi(shop);
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
  const dataNotification = parseNotificationDataGraphql(order, shop);
  return dataNotification;
}
