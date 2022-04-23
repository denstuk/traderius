import React from "react";
import "./ProfitableTable.scoped.sass";
import { IProfitableStock, useApi } from "../../../domain";
import { PuffLoader } from "../PuffLoader/PuffLoader";
import { ProfitableTableRow } from "./ProfitableTableRow/ProfitableTableRow";
import { TableHeader } from "./TableHeader/TableHeader";

export const ProfitableTable: React.FC = () => {
	const { loading, data } = useApi<IProfitableStock[]>({ url: "http://localhost:9801/api/v1/stocks/profitable" });

	return (
		<div className="profitable-table">
			{loading ? (
				<PuffLoader isLoading={loading} />
			) : (
				<React.Fragment>
					<TableHeader names={["Тикер", "Компания", "Актив", "Изменение"]} />
					{data &&
						data.map((stock, index) => (
							<ProfitableTableRow key={`profitable:${stock.ticker}`} stock={stock} index={index} />
						))}
				</React.Fragment>
			)}
		</div>
	);
};
