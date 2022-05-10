import { Module } from "@nestjs/common";
import { CryptoService } from "./services/crypto.service";
import { JwtService } from "./services/jwt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [UsersModule],
	providers: [CryptoService, JwtService, AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
