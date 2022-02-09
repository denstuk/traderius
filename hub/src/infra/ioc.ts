import * as inversify from "inversify";
import { AuthController } from "../app/http/controllers/auth.controller";
import { PasswordService } from "../domain/shared/password.service";
import { TokenService } from "../domain/shared/token.service";
import { UserService } from "../domain/users/services/user.service";
import { Redis } from "./redis";

const container = new inversify.Container();

/* Services */
container.bind<PasswordService>(PasswordService).toSelf().inSingletonScope();
container.bind<TokenService>(TokenService).toSelf().inSingletonScope();
container.bind<Redis>(Redis).toSelf().inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();

/* Controllers */
container.bind<AuthController>(AuthController).toSelf().inRequestScope();

export { container as ioc };
