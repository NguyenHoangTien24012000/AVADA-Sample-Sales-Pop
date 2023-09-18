import createShopifyNodeApi from '../../const/shopifyNodeApi';
import {URL_SCRIPTTAG_REGISTER} from '../../const/urlScripttagRegister';

export default async function registerScripttag(shop) {
  const shopify = createShopifyNodeApi(shop);
  const listScripttag = await shopify.scriptTag.list();
  const hasScripttag = listScripttag.find(element => element.src === URL_SCRIPTTAG_REGISTER);
  if (!!hasScripttag) {
    return;
  }
  await shopify.scriptTag.create({
    event: 'onload',
    src: URL_SCRIPTTAG_REGISTER
  });
}
