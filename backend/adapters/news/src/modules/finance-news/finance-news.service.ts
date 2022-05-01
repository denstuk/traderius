import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NewsDto } from "./dtos/news-dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { RedisCacheService } from "../infrastructure/redis-cache/redis-cache.service";
import * as dayjs from "dayjs";

@Injectable()
export class FinanceNewsService {
  private readonly logger: Logger = new Logger(FinanceNewsService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisCacheService
  ) {}

  get redisKey(): string {
    const today = dayjs().format("MM/DD/YYYY");
    return `news-service:finance-news:${today}`;
  }

  async fetchNews(): Promise<NewsDto[]> {
    let news = await this.fetchFromRedis();
    if (news) {
      this.logger.debug("News received from Redis");
      return news;
    }

    news = await this.fetchFromAPI();
    await this.redisService.set(this.redisKey, JSON.stringify(news));
    this.logger.debug("News received from API");

    return news;
  }

  private async fetchFromAPI(): Promise<NewsDto[]> {
    const headers: Record<string, string> = {};
    headers["x-rapidapi-host"] = this.config.get("FINANCE_NEWS_API_RAPID_HOST");
    headers["x-rapidapi-key"] = this.config.get("FINANCE_NEWS_API_RAPID_KEY");

    const response = await firstValueFrom(this.httpService.get(this.config.get("FINANCE_NEWS_API_HOST"), { headers }));
    return response.data;
  }

  private async fetchFromRedis(): Promise<NewsDto[] | undefined> {
    const cachedNews = await this.redisService.get(this.redisKey);
    return cachedNews ? (JSON.parse(cachedNews) as NewsDto[]) : undefined;
  }
}
