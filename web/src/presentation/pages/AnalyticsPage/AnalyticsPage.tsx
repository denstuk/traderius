import React from "react";
import "./AnalyticsPage.scoped.sass";
import dayjs from "dayjs";
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
import { AnalysisApi } from "../../../infrastructure/api/analysis/analysis";
import type { IAnalysis } from "../../../domain";
import {AnalysisResultBadge} from "./AnalysisResultBadge/AnalysisResultBadge";
import {Toaster} from "../../../domain/services/toaster";
import {findMaxByField, findMinByField} from "../../../domain";

type IStock = { open: number; close: number, time: string; }
type IStockForPredictionGraph = { price?: number; predicted?: number, time: string; }

export const AnalyticsPage: React.FC = () => {
	const [ticker, setTicker] = React.useState("");
	const [analysis, setAnalysis] = React.useState<IAnalysis>();
	const [stocksForMainGraph, setStocksForMainGraph] = React.useState<IStock[] | undefined>(undefined);
	const [stocksForLast7Graph, setStocksForLast7Graph] = React.useState<IStockForPredictionGraph[] | undefined>(undefined);

	const onTickerChange = (value: string) => setTicker(value);

	const onAnalysisBtnClick = async (): Promise<void> => {
		if (!ticker || ticker === "") return;

		const stocksResponse = await StocksApi.getLastMonth({ ticker });
		if (!stocksResponse) return Toaster.error("Не получилось получить информацию об активе");

		const analysisResponse = await AnalysisApi.analyse({ ticker });
		if (!analysisResponse) return Toaster.error("Не получилось получить аналитику по активу");

		const convertedStocks = stocksResponse.map((candle) => {
			return { open: candle.o, close: candle.c, time: dayjs(candle.time) }
		});

		const forMainGraph = convertedStocks.map((stock) => { return { ...stock, time: stock.time.format("MM-DD") } });
		setStocksForMainGraph(forMainGraph);

		const last7days = convertedStocks.splice(-7);
		const last7daysConverted = last7days.splice(-6).map((i) => { return { price: i.close, time: i.time.format("MM-DD") } });
		const lastDate = last7days[last7days.length - 1];
		const nextWeekAfterLastDate = lastDate.time.add(1, "week");
		const nextMonthAfterLastDate = lastDate.time.add(1, "month");

		const prediction = [
			{ predicted: lastDate.close, price: lastDate.close, time: lastDate.time.format("MM-DD") },
			{ predicted: analysisResponse.lstm.lstm7, time: nextWeekAfterLastDate.format("MM-DD") },
			{ predicted: analysisResponse.lstm.lstm30, time: nextMonthAfterLastDate.format("MM-DD") },
		];
		const for7daysGraph = [...last7daysConverted, ...prediction];
		setStocksForLast7Graph(for7daysGraph);

		setAnalysis(analysisResponse);
	}

	return (
		<div className="analytics">
			<PageTitle text="Аналитика" />
			<PredictionForm setTicker={onTickerChange} ticker={ticker} onAnalysisClick={onAnalysisBtnClick} />

			 { stocksForMainGraph && stocksForMainGraph.length !== 0 && (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart margin={{ top: 50 }} width={500} height={300} data={stocksForMainGraph}>
						<CartesianGrid strokeDasharray="3 3" opacity={0.1} />
						<XAxis padding={{ left: 10, right: 10 }} dataKey="time" />
						<YAxis domain={[
							findMinByField(stocksForMainGraph, ['open', 'close']) - 5,
							findMaxByField(stocksForMainGraph, ['open', 'close']) + 5
						]} />
						<Line name="Цена открытия" type="monotone" dataKey="open" stroke="#ff0000" strokeWidth={2} />
						<Line name="Цена закрытия" type="monotone" dataKey="close" stroke="#00ff00" strokeWidth={2} />
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			) }
			{ analysis && <AnalysisResultBadge analysis={analysis} /> }

			{ stocksForLast7Graph && stocksForLast7Graph.length !== 0 && (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart margin={{ top: 50 }} width={500} height={300} data={stocksForLast7Graph}>
						<CartesianGrid strokeDasharray="3 3" opacity={0.1} />
						<XAxis dataKey="time" />
						<YAxis domain={[
							findMinByField(stocksForLast7Graph, ['price', 'predicted']) - 5,
							findMaxByField(stocksForLast7Graph, ['price', 'predicted']) + 5
						]} />
						<Line name="Цена" type="monotone" dataKey="price" stroke="#ff0000" strokeWidth={2} />
						<Line name="Предсказание" type="monotone" dataKey="predicted" stroke="#00ff00" strokeWidth={2} />
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			) }
		</div>
	);
}
