import React from "react";
import "./NewsCard.scoped.sass";
import { NewsBlock } from "./NewsBlock/NewsBlock";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INews, useApi } from "../../../domain";
import { PuffLoader } from "../PuffLoader/PuffLoader";

const NEWS_PER_PAGE = 3;

export const NewsCard: React.FC = () => {
	const { loading, data } = useApi<INews[]>({ url: "http://localhost:9801/api/v1/news" });
	const [position, setPosition] = React.useState(0);
	const isNewsLoaded = !loading && data && data.length !== 0;

	const togglePosition = (direction: "prev" | "next"): void => {
		if (direction === "prev") return setPosition(position === 0 ? 0 : position - 1);
		if (direction === "next") return setPosition(position === data.length - 1 ? data.length - 1 : position + 1);
	};

	return (
		<div className="news">
			{isNewsLoaded ? (
				<NewsBlock news={data.slice(position, position + NEWS_PER_PAGE)} />
			) : (
				<PuffLoader isLoading={loading} />
			)}
			<div className="news__toggle-bar">
				<button onClick={() => togglePosition("prev")} className="news__toggle-btn">
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				<button onClick={() => togglePosition("next")} className="news__toggle-btn">
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
		</div>
	);
};
