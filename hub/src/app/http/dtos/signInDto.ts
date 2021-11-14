import { IsDefined, IsString } from "class-validator";

export class SignInDto {
    @IsDefined()
    @IsString()
    credential!: string; // login or email

    @IsDefined()
    @IsString()
    password!: string;
}
