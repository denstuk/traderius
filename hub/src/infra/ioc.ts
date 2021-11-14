import * as inversify from "inversify";
import { Redis } from "./redis";

const container = new inversify.Container();
container.bind<Redis>(Redis).toSelf().inSingletonScope();

export { container as ioc }
