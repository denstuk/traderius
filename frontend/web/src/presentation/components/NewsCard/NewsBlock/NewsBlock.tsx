import React from "react";
import "./NewsBlock.scoped.sass";
import type { INews } from "../../../../domain";
import dayjs from "dayjs";

type INewsBlockProps = { news: INews[] };

export const NewsBlock: React.FC<INewsBlockProps> = ({ news: newsList }: INewsBlockProps) => {
	const prepareDate = (pubDate: string) => {
		const date = dayjs(pubDate).format("MMMM D, YYYY hh:mm");
		const dateElements = date.split(" ");

		const month = dateElements[0].charAt(0).toUpperCase() + dateElements[0].slice(1);
		dateElements[0] = month;

		return dateElements.join(" ");
	};

	return (
		<React.Fragment>
			{newsList.map((news) => {
				return (
					<a href={news.link} className="news">
						<div className="news__header">
							<h3 className="news__publisher">{news.source}</h3>
							<h3 className="news__date">{prepareDate(news.pubDate)}</h3>
						</div>
						<div className="news__body">
							<h2 className="news__title">{news.title}</h2>
						</div>
					</a>
				);
			})}
		</React.Fragment>
	);
};
