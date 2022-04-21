import React from "react";
import "./HomePage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {NewsCard} from "../../components/NewsCard/NewsCard";
import {ProfitableTable} from "../../components/ProfitableTable/ProfitableTable";

export const HomePage: React.FC = () => {
	return (
		<div className="home">
			<PageTitle text="Главная страница" />
			<NewsCard />
			<ProfitableTable />
		</div>
	);
};
