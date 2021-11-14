import * as React from "react";
import { INews } from "../../api/news/types";

interface INewsBlockProps {
    news: INews;
}

export const NewsBlock: React.FC<INewsBlockProps> = ({ news }: INewsBlockProps) => {
    return (
        <div className="news__block">
            <p className="news__title">{news.pubDate.split("T")[0]}</p>
            <p className="news__subtitle">{news.title}</p>
            <a href={news.link}>Подробнее</a>
        </div>
    )
};
