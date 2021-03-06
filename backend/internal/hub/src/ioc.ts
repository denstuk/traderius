import * as inversify from "inversify";
import { Logger } from "./infra";
import { AuthController } from "./app/http/routers/v1/authentication/auth.controller";
import { PasswordService } from "./domain/auth/password.service";
import { TokenService } from "./domain/auth/token.service";
import { UserService } from "./domain/users/user.service";
import { Redis } from "./infra/redis";
import { Regressor } from "./domain/analysis/regressor";
import { AnalysisController } from "./app/http/routers/v1/analysis/analysis.controller";
import { UsersController } from "./app/http/routers/v1/users/users.controller";
import { Predictor } from "./infra/predictor";
import { Thread } from "./infra/thread";
import { RoiCalculator } from "./domain/analysis/roi-calculator";
import { UserMapper } from "./domain/users/user.mapper";
import { AnalyzeStocksScheduler } from "./app/schedulers/analyze-stocks.scheduler";
import { Application } from "./application";
import { HttpServer } from "./app/http/server";
import { SchedulersMaster } from "./app/schedulers/schedulers-master";
import { KafkaClientService } from "./infra/kafka/kafka-client.service";

const container = new inversify.Container();

container.bind<Application>(Application).toSelf().inSingletonScope();
container.bind<Logger>(Logger).toSelf().inSingletonScope();

/* Infrastructure */
container.bind<Redis>(Redis).toSelf().inSingletonScope();
container.bind<Predictor>(Predictor).toSelf().inSingletonScope();
container.bind<Thread>(Thread).toSelf().inSingletonScope();

/* Domain */
container.bind<PasswordService>(PasswordService).toSelf().inSingletonScope();
container.bind<TokenService>(TokenService).toSelf().inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container.bind<UserMapper>(UserMapper).toSelf().inSingletonScope();
container.bind<Regressor>(Regressor).toSelf().inSingletonScope();
container.bind<RoiCalculator>(RoiCalculator).toSelf().inSingletonScope();
container.bind<KafkaClientService>(KafkaClientService).toSelf().inSingletonScope();

/* Application */
container.bind<HttpServer>(HttpServer).toSelf().inSingletonScope();

/* Controllers */
container.bind<AuthController>(AuthController).toSelf().inRequestScope();
container.bind<AnalysisController>(AnalysisController).toSelf().inRequestScope();
container.bind<UsersController>(UsersController).toSelf().inRequestScope();

/* Schedulers */
container.bind<SchedulersMaster>(SchedulersMaster).toSelf().inSingletonScope();
container.bind<AnalyzeStocksScheduler>(AnalyzeStocksScheduler).toSelf().inSingletonScope();

export { container as ioc };
