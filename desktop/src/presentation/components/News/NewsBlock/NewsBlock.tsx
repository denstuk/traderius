import * as React from "react";
import "./NewsBlock.css";
import { INews } from "../../../../domain";

type INewsBlockProps = { news: INews; }

export const NewsBlock: React.FC<INewsBlockProps> = ({ news }: INewsBlockProps) => {
    return (
        <div className="news-block">
            <h3 className="news-block__date">{news.pubDate.split("T")[0]}</h3>
            <h2 className="news-block__subtitle">{news.title}</h2>
            <a href={news.link}>Подробнее</a>
        </div>
    )
};
