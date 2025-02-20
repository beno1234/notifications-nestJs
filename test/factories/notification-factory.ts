import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationsProps,
} from '@application/entities/notification';

type Override = Partial<NotificationsProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('new solicitation of friendship!'),
    recipientId: 'recipient-2',
    ...override,
  });
}
