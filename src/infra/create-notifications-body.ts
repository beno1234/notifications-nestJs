/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsUUID, Length } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateNotificationBody {
    @IsNotEmpty()
    @IsUUID()
    recipientId: string;
    
    @IsNotEmpty()
    @Length(5, 240)
    content: string;

    @IsNotEmpty()
    category: string;
}