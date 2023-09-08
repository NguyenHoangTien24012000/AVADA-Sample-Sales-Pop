import * as notificationRepository from '../repositories/notificationRepository';
export async function getNotifications(ctx) {
  try {
    const notifications = await notificationRepository.getNotifications();
    return (ctx.body = {
      success: true,
      data: notifications
    });
  } catch (error) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      data: {},
      message: error
    });
  }
}
