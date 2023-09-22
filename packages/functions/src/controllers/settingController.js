import * as settingRepository from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';

export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const setting = await settingRepository.getSetting(shopId);
    return (ctx.body = {
      success: true,
      data: setting
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message
    });
  }
}

export async function updateSetting(ctx) {
  try {
    const {data} = ctx.req.body;
    console.info(data);
    const resUpdate = await settingRepository.updateSetting(data);
    if (resUpdate === null) {
      ctx.status = 404;
      return (ctx.body = {
        success: false,
        data: []
      });
    }
    return (ctx.body = {
      success: true,
      data: []
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message
    });
  }
}
