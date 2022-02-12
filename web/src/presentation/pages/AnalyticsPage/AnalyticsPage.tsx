import React from "react";
import "./AnalyticsPage.scoped.sass";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { PredictionForm } from "../../components/PredictionForm/PredictionForm";
import {
	Line,
	LineChart,
	Tooltip,
	YAxis,
	XAxis,
	CartesianGrid,
} from "recharts";

const data = [
	{ pv: 1, uv: 0 },
	{ pv: 2, uv: 1 },
	{ pv: 5, uv: 1 },
	{ pv: 1.3, uv: 2 },
	{ pv: 3, uv: 2 },
];

const stocksData = [30, 30.1, 31, 29, 32, 35, 40, 36, 35, 34].map((i) => {
	return { price: i };
});

export const AnalyticsPage: React.FC = () => {
	return (
		<div className="analytics">
			<PageTitle text="Аналитика" />
			<PredictionForm />

			<LineChart margin={{ top: 50 }} width={500} height={300} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Line type="monotone" dataKey="pv" stroke="#8884d8" />
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineChart>

			<LineChart width={500} height={300} data={stocksData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis from={stocksData[0].price} dataKey="name" />
				<YAxis domain={[20, 40]} />
				<Tooltip />
				<Line type="monotone" dataKey="price" stroke="#665fec" />
			</LineChart>
		</div>
	);
};
