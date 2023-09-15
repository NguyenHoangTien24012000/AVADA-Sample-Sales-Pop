import createShopifyNodeApi from '../../const/shopifyNodeApi';
import {URL_SCRIPTTAG_REGISTER} from '../../const/urlScripttagRegister';

export default async function registerScripttag(shop) {
  try {
    const shopify = createShopifyNodeApi(shop);

    const listScripttag = await shopify.scriptTag.list();
    const index = listScripttag.findIndex(element => element.src === URL_SCRIPTTAG_REGISTER);
    if (index !== -1) {
      return;
    }
    await shopify.scriptTag.create({
      event: 'onload',
      src: URL_SCRIPTTAG_REGISTER
    });
  } catch (error) {
    console.error(error);
  }
}
