export default function formatDataNotification(order, shopId, shopDomain) {
  const {
    billingAddress: {firstName, city, country},
    createdAt,
    lineItems: {edges}
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
  if (!city || !country || !title || !id || !url || !createdAt) {
    console.error('Dữ liệu không hợp lệ trong order:', order);
    return null;
  }
  return {
    firstName: firstName || '',
    city,
    country,
    timestamp: new Date(createdAt),
    productId: parseInt(/[0-9]{10,}$/g.exec(id)[0]),
    productName: title,
    productImage: url,
    shopId: shopId,
    shopDomain: shopDomain
  };
}
