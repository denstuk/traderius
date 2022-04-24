import React from "react";
import "./HomePage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { ProfitableTable } from "../../components/ProfitableTable/ProfitableTable";
import { Label } from "../../components/Text/Label/Label";
import { LabelDescription } from "../../components/Text/LabelDescription/LabelDescription";

export const HomePage: React.FC = () => {
	return (
		<div className="home">
			<PageTitle text="Главная страница" />

			<Label text="Последние новости" />
			<LabelDescription text={"Подборка главных новостей из мира финансов"} />
			<NewsCard />

			<Label text="Лучший прогноз за неделю" />
			<LabelDescription text={"Алгоритмическая оценка активов"} />
			<ProfitableTable />
		</div>
	);
};
