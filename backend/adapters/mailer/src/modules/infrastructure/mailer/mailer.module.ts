import * as path from "path";
import { Module } from "@nestjs/common";
import { MailerModule as NodeMailerModule, MailerService } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    ConfigModule,
    NodeMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          port: config.get("MAIL_PORT"),
          host: config.get("MAIL_HOST"),
        },
        defaults: {
          from: config.get("MAIL_FROM"),
        },
        template: {
          dir: path.join(__dirname, "../../../../templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class MailerModule {}
