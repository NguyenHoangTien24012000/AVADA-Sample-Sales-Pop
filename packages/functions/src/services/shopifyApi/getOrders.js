import createShopifyNodeApi from '../../const/shopifyNodeApi';

export default async function getOrders(shop) {
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
  const shopify = createShopifyNodeApi(shop);
  const data = await shopify.graphql(query);
  const dataResult = data?.orders.edges;
  return dataResult;
}
