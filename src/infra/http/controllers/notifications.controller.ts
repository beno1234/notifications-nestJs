/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notifications-body';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notifcation';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
// serve para roteamento tambem
@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getFromRecipientNotifications: GetRecipientNotifications,
  ) {
    
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id:string
  ) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId:string): Promise<{ count: number }> {
    const {count} = await this.countRecipientNotifications.execute({
      recipientId,
    })

    return{
      count
    }
  }


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId:string) {
    const {notifications} = await this.getFromRecipientNotifications.execute({
      recipientId,
    })

    return{
      notifications: notifications.map(NotificationViewModel.toHTTP)
    };
  }

  @Patch(':id/read')
  async read(
    @Param('id') id:string
  ) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unRead(
    @Param('id') id:string
  ) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }



  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const {recipientId, content, category} = body;
   

    const {notification} = await this.sendNotification.execute({
      recipientId,
      content,
      category,
      
    })

    return {notification: NotificationViewModel.toHTTP(notification)}
  }
}
