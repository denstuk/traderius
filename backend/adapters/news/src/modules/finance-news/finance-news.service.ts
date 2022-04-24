import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { NewsDto } from "./dtos/news-dto";
import { Cache } from "cache-manager";

@Injectable()
export class FinanceNewsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly config: ConfigService) {}

  async fetchFromAPI(): Promise<NewsDto[]> {
    const response = await axios.get(this.config.get("FINANCE_NEWS_API_HOST"), {
      headers: {
        "x-rapidapi-host": this.config.get("FINANCE_NEWS_API_RAPID_HOST"),
        "x-rapidapi-key": this.config.get("FINANCE_NEWS_API_RAPID_KEY"),
      },
    });
    return response.data;
  }
}
