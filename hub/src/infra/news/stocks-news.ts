import axios from "axios";
import { inject, injectable } from "inversify";
import { Logger } from "../logger";
import { Redis } from "../redis";
import { Configuration } from "../configuration";
import { ioc } from "../../ioc";
import type { INews } from "./stocks-news.types";

@injectable()
export class StocksNews {
	private readonly logger: Logger = ioc.resolve(Logger);
	private readonly defaultNewsTtl: number = 1000 * 60 * 60 * 24;
	private readonly redisKey = (date: Date) => `StocksNews:${date.toLocaleDateString()}`;

	constructor(@inject(Redis) private redis: Redis) {}

	async fetch(): Promise<INews[]> {
		this.logger.debug("StocksNews: trying receive news from redis");
		const news = await this.fetchFromRedis();
		if (news) return news;
		this.logger.debug("StocksNews: redis does not contain news fallback to request");
		return this.fetchFromWebSite();
	}

	private async fetchFromRedis(): Promise<INews[] | undefined> {
		const key = this.redisKey(new Date());
		return this.redis.getObject<INews[]>(key);
	}

	private async fetchFromWebSite(): Promise<INews[]> {
		const key = this.redisKey(new Date());
		const response = await axios.get("https://mboum-finance.p.rapidapi.com/ne/news", {
			headers: {
				"x-rapidapi-host": Configuration.get<string>("NewsRapidHost"),
				"x-rapidapi-key": Configuration.get<string>("NewsRapidKey"),
			},
		});
		const news = response.data;
		await this.redis.set(key, news, this.defaultNewsTtl);
		return news;
	}
}
