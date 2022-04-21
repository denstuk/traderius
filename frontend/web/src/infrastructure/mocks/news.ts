import type { INews } from "../../domain";

export class NewsMocker {
    private static index: number = 0;

    static mock(amount: number): INews[] {
        const news: INews[] = [];
        for (let i = 0; i < amount; i++) {
            news.push({
                id: String(NewsMocker.index),
                title: "Stocks end in red, Nasdaq closes out worst week since Feb. 2021 " + NewsMocker.index,
                link: "https://google.com",
                pubDate: new Date().toDateString(),
                source: "Shelby News Paper LTD"
            });
            NewsMocker.index += 1;
        }
        return news;
    }
}
