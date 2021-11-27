import * as inversify from "inversify";
import { PasswordService } from "../domain/shared/password.service";
import { TokenService } from "../domain/shared/token.service";
import { AuthService } from "../domain/users/auth/auth.service";
import { UserService } from "../domain/users/user.service";
import { Redis } from "./redis";

const container = new inversify.Container();

/* Domain services */
container.bind<PasswordService>(PasswordService).toSelf().inSingletonScope();
container.bind<TokenService>(TokenService).toSelf().inSingletonScope();
container.bind<AuthService>(AuthService).toSelf().inSingletonScope();
container.bind<Redis>(Redis).toSelf().inSingletonScope();

container.bind<UserService>(UserService).toSelf().inSingletonScope();

export { container as ioc };
