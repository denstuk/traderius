import React from "react";
import "./HomePage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {NewsCard} from "../../components/NewsCard/NewsCard";

export const HomePage: React.FC = () => {
	return (
		<div className="home">
			<PageTitle text="Главная страница" />
			<NewsCard />
		</div>
	);
};
