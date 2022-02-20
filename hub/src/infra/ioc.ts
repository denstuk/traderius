import * as inversify from "inversify";
import { AuthController } from "../app/http/controllers/auth.controller";
import { PasswordService } from "../domain/shared/password.service";
import { TokenService } from "../domain/shared/token.service";
import { UserService } from "../domain/users/user.service";
import { Redis } from "./redis";
import { Regressor } from "../domain/analysis/regressor";
import { AnalysisController } from "../app/http/controllers/analysis.controller";
import { StocksNews } from "./news";
import { UsersController } from "../app/http/controllers/users.controller";
import { Predictor } from "./predictor";
import { Thread } from "./thread";
import { RoiCalculator } from "../domain/analysis/roi-calculator";
import { UserMapper } from "../domain/users/user.mapper";

const container = new inversify.Container();

/* Infrastructure */
container.bind<Redis>(Redis).toSelf().inSingletonScope();
container.bind<StocksNews>(StocksNews).toSelf().inSingletonScope();
container.bind<Predictor>(Predictor).toSelf().inSingletonScope();
container.bind<Thread>(Thread).toSelf().inSingletonScope();

/* Domain */
container.bind<PasswordService>(PasswordService).toSelf().inSingletonScope();
container.bind<TokenService>(TokenService).toSelf().inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container.bind<UserMapper>(UserMapper).toSelf().inSingletonScope();
container.bind<Regressor>(Regressor).toSelf().inSingletonScope();
container.bind<RoiCalculator>(RoiCalculator).toSelf().inSingletonScope();

/* Controllers */
container.bind<AuthController>(AuthController).toSelf().inRequestScope();
container.bind<AnalysisController>(AnalysisController).toSelf().inRequestScope();
container.bind<UsersController>(UsersController).toSelf().inRequestScope();

export { container as ioc };
