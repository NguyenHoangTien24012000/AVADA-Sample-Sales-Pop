export default async function createAssetSimpleSalePop(shopify) {
  const themesList = await shopify.theme.list({fields: ['id', 'role'].join(',')});
  const themeMainId = themesList[0].id;
  await shopify.asset.create(themeMainId, {
    key: 'snippets/avada-sample-sale-pop.liquid',
    value: `<script>
          window.NOTIFICATIONS_AVADA_SAMPLE_SALE_POPUP = {{shop.metafields.sample_sale_pop.notifications |json}};
          window.SETTING_AVADA_SAMPLE_SALE_POPUP = {{shop.metafields.sample_sale_pop.setting |json}}
    </script>`
  });
}
