// const shop = await getShopById(shopId);
// console.log(shop);
// const shopify = createShopifyNodeApi(shop);
// step1:
// const data = await shopify.theme.list();
// console.log('DATA', data);
// step2:
// await shopify.asset.create(158397956370, {
//   key: 'snippets/test1.liquid',
//   value: `<script>
//       window.SALEPOPUP1 = {{shop.metafields.namespacetest.keytest |json}};
// </script>`
// });
// step3:
// await shopify.metafield.create({
//   namespace: 'namespacetest',
//   key: 'keytest',
//   type: 'json_string',
//   value: JSON.stringify(setting)
// });

// console.log('DATA----');
