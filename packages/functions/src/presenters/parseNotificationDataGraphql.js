import parseId from '../helpers/parseId';

export default function parseNotificationDataGraphql(order, shop) {
  const {shopifyDomain: shopDomain, id: shopId} = shop;
  const {
    id: orderId,
    billingAddress: {firstName, city, country},
    createdAt,
    lineItems: {edges}
  } = order;
  const {
    node: {
      title,
      id: productId,
      product: {
        featuredImage: {url: productImageUrl}
      }
    }
  } = edges[0];
  if (!city || !country || !title || !productId || !orderId || !productImageUrl || !createdAt) {
    console.error('Dữ liệu không hợp lệ trong order:', order);
    return null;
  }
  return {
    orderId: parseId(orderId),
    firstName: firstName || '',
    city,
    country,
    timestamp: new Date(createdAt),
    productId: parseId(productId),
    productName: title,
    productImage: productImageUrl,
    shopId,
    shopDomain
  };
}
