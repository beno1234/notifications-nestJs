/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateNewNotifications {
    @IsNotEmpty()
    recipientId: string;
    content: string;
    category: string;
}