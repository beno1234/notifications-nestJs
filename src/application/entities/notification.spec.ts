import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('New Solicitation on your profile'),
      category: 'social',
      recipientId: 'example-recipiendId',
    });

    expect(notification).toBeTruthy();
  });
});
