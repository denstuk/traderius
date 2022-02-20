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
	CartesianGrid, ResponsiveContainer,
} from "recharts";
import { StocksApi } from "../../../infrastructure/api/stocks/stocks";
import dayjs from "dayjs";

interface IStock {
	price: number;
	time: string;
}

export const AnalyticsPage: React.FC = () => {
	const [ticker, setTicker] = React.useState("");
	const [stocks, setStocks] = React.useState<IStock[]>([]);

	const onTickerChange = (value: string) => setTicker(value);

	const onAnalysisBtnClick = async (): Promise<void> => {
		if (!ticker || ticker === "") return;
		const result = await StocksApi.getLastMonth.bind(StocksApi)({ ticker });
		if (result) {
			const mapped = result.map((i) => {
				return { price: i.c, time: dayjs(i.time).format("MM-DD") }
			});
			setStocks(mapped);
		}
	}

	function getMinPrice<T extends { price: number }>(array: T[] | undefined): number {
		if (!array) return 0;
		if (array.length === 0) return 0;
		let min = array[0].price;
		for (const item of array) {
			if (min > item.price) min = item.price;
		}
		return min;
	}
	function getMaxPrice<T extends { price: number }>(array: T[] | undefined): number {
		if (!array) return 0;
		if (array.length === 0) return 0;
		let max = array[0].price;
		for (const item of array) {
			if (max < item.price) max = item.price;
		}
		return max;
	}


	return (
		<div className="analytics">
			<PageTitle text="Аналитика" />
			<PredictionForm setTicker={onTickerChange} ticker={ticker} onAnalysisClick={onAnalysisBtnClick} />

			{ !stocks || stocks.length !== 0 && (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart margin={{ top: 50 }} width={500} height={300} data={stocks}>
						<CartesianGrid strokeDasharray="3 3" opacity={0.1} />
						<XAxis dataKey="time" />
						<YAxis domain={[getMinPrice(stocks) - 5, getMaxPrice(stocks) + 5]} />
						<Line type="monotone" dataKey="price" stroke="#ff0000" strokeWidth={2} />
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			) }
		</div>
	);
};
