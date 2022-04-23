import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { MailerModule } from "./mailer/mailer.module";

@Module({
  imports: [ConfigurationModule, MailerModule],
})
export class InfrastructureModule {}
