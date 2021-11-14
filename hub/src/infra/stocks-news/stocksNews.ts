import axios from 'axios';
import { inject, injectable } from 'inversify';
import { Config } from '../config';
import { Logger } from '../logger';
import { Redis } from '../redis';

interface INews {
    title: string;
    link: string;
    pubDate: string;
    source: string;
}

@injectable()
export class StocksNews {
    private readonly redisKey = (date: string) => `StocksNews:${date}`;
    constructor(@inject(Redis) private redis: Redis) {}

    async fetch(): Promise<INews[]> {
        const currentDate = new Date().toLocaleDateString();
        const key = this.redisKey(currentDate);

        const todayNews = await this.redis.getObject<INews[]>(key);
        if (todayNews) {
            Logger.info("Received news from Redis");
            return todayNews;
        }
        
        Logger.info("Received news from Web");
        const response = await axios.get("https://mboum-finance.p.rapidapi.com/ne/news", {
            headers: {
                'x-rapidapi-host': Config.get<string>("NewsRapidHost"),
                'x-rapidapi-key': Config.get<string>("NewsRapidKey")
            }
        });
        const news = response.data;

        this.redis.set(key, news);
        return news;
    }
}

