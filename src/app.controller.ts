/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto'
import { CreateNewNotifications } from './create-notifications-body';
// serve para roteamento tambem
@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
// rotemento nesse caso como nao tem nada no controller entao continua com o /
  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNewNotifications) {
    const {recipientId, content, category} = body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      }
    })
  }
}
