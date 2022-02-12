import * as inversify from "inversify";
import { AuthController } from "../app/http/controllers/auth.controller";
import { PasswordService } from "../domain/shared/password.service";
import { TokenService } from "../domain/shared/token.service";
import { UserService } from "../domain/users/services/user.service";
import { Redis } from "./redis";
import { Regressor } from "../domain/analysis/regressor";
import { AnalysisController } from "../app/http/controllers/analysis.controller";
import { StocksNews } from "./news";

const container = new inversify.Container();

/* Infrastructure */
container.bind<Redis>(Redis).toSelf().inSingletonScope();
container.bind<StocksNews>(StocksNews).toSelf().inSingletonScope();

/* Domain */
container.bind<PasswordService>(PasswordService).toSelf().inSingletonScope();
container.bind<TokenService>(TokenService).toSelf().inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container.bind<Regressor>(Regressor).toSelf().inSingletonScope();

/* Controllers */
container.bind<AuthController>(AuthController).toSelf().inRequestScope();
container.bind<AnalysisController>(AnalysisController).toSelf().inRequestScope();

export { container as ioc };
