import { ConfigModule } from "@nestjs/config";

export const ConfigurationModule = ConfigModule.forRoot({
	isGlobal: true,
	envFilePath: [`.env.${process.env["NODE_ENV"]}`],
});
