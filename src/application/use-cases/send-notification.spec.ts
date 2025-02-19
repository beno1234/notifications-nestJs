/* eslint-disable @typescript-eslint/require-await */
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send-notification', () => {
  it('Should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      content: 'this is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });
    console.log(notifications);
    expect(notifications).toHaveLength(1);
  });
});
