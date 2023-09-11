import * as settingRepository from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';
export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = await settingRepository.getSettings(shopId);
    return (ctx.body = {
      success: true,
      data: settings
    });
  } catch (error) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      data: {},
      error: error.message
    });
  }
}

export async function updateSetting(ctx) {
  try {
    const {data} = ctx.req.body;
    const resUpdate = await settingRepository.updateSettings(data);
    if (resUpdate === null) {
      ctx.status = 404;
      return (ctx.body = {
        success: false,
        data: {}
      });
    }
    return (ctx.body = {
      success: true,
      data: []
    });
  } catch (error) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      data: {},
      error: error.message
    });
  }
}
