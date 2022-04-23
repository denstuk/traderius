import { Controller, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MailerService } from "@nestjs-modules/mailer";
import { UserCreatedPayload } from "./core/dtos/user-created-payload";
import { MessagePayload } from "./core/mailer.types";

@Controller()
export class AppController {
  private readonly logger: Logger;

  constructor(private readonly config: ConfigService, private readonly mailerService: MailerService) {
    this.logger = new Logger(config.get("SERVICE_NAME"));
  }

  @MessagePattern("hub.user-created")
  async sendWelcomeLetter(@Payload() payload: MessagePayload<UserCreatedPayload>): Promise<void> {
    await this.mailerService.sendMail({
      to: payload.value.email,
      subject: "Добро пожаловать в Traderius",
      template: "/welcome-letter",
      context: { login: payload.value.login },
    });
  }
}
