import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [ConfigurationModule, RedisModule],
})
export class InfrastructureModule {}
