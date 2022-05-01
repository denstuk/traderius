import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<string | undefined> {
    return this.cache.get<string | undefined>(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.cache.set(key, value);
  }
}
