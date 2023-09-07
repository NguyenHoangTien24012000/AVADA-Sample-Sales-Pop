import {string, number, boolean, object} from 'yup';

export default async function validateSetting(ctx, next) {
  try {
    const {data} = ctx.req.body.data;
    const schema = object({
      position: string(),
      hideTimeAgo: boolean(),
      truncateProductName: boolean(),
      displayDuration: number()
        .positive()
        .integer(),
      firstDelay: number()
        .positive()
        .integer(),
      popsInterval: number()
        .positive()
        .integer(),
      maxPopsDisplay: number()
        .positive()
        .integer(),
      includedUrls: string(),
      excludedUrls: string(),
      allowShow: string()
    });
    await schema.validate(data);
    return next();
  } catch (error) {
    ctx.status = 400;
    return (ctx.body = {
      success: false,
      error: error.message
    });
  }
}
