import React, { useEffect } from "react";
import "./ProfitableTable.scoped.sass";
import { IProfitableStock } from "../../../domain";
import { PuffLoader } from "../Loaders/PuffLoader/PuffLoader";
import { ProfitableTableRow } from "./ProfitableTableRow/ProfitableTableRow";
import { TableHeader } from "./TableHeader/TableHeader";
import axios from "axios";

export const ProfitableTable: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [stocks, setStocks] = React.useState<IProfitableStock[]>([]);

	useEffect(() => {
		const profitableStocksRequest = async (): Promise<void> => {
			const response = await axios({ url: "http://localhost:9801/api/v1/stocks/profitable" });
			setStocks(response.data);
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		};
		profitableStocksRequest().then();
	}, []);

	return (
		<React.Fragment>
			{isLoading ? (
				<PuffLoader isLoading={isLoading} size={90} />
			) : (
				<div className="profitable-table">
					<TableHeader names={["Тикер", "Компания", "Актив", "Изменение"]} />
					{stocks &&
						stocks.map((stock, index) => (
							<ProfitableTableRow key={`profitable:${stock.ticker}`} stock={stock} index={index} />
						))}
				</div>
			)}
		</React.Fragment>
	);
};
