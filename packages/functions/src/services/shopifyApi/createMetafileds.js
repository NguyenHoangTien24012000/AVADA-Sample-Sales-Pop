import {getNotificationsClientApi} from '../../repositories/notificationRepository';
import {getSetting} from '../../repositories/settingRepository';

export default async function createMetafieldsSimpleSalePop(shop, shopify) {
  const shopId = shop.id;
  const setting = await getSetting(shopId);
  const {maxPopsDisplay} = setting;
  const notifications = await getNotificationsClientApi(shopId, maxPopsDisplay);
  const createSettingMetafield = shopify.metafield.create({
    namespace: 'sample_sale_pop',
    key: 'setting',
    type: 'json_string',
    value: JSON.stringify(setting)
  });
  const createNotificationsMetafield = shopify.metafield.create({
    namespace: 'sample_sale_pop',
    key: 'notifications',
    type: 'json_string',
    value: JSON.stringify(notifications)
  });
  Promise.all(
    [createSettingMetafield, createNotificationsMetafield].map(p => p.catch(e => console.error(e)))
  );
}
