import { IsString } from "class-validator";

export class AdminDto { 
    @IsString()
    key: string;
}