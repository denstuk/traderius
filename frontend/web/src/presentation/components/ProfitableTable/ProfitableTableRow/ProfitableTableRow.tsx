import React from "react";
import "./ProfitableTableRow.scoped.sass";
import { IProfitableStock } from "../../../../domain";

type ProfitableTableRowProps = { stock: IProfitableStock; index: number };

export const ProfitableTableRow: React.FC<ProfitableTableRowProps> = ({ stock, index }: ProfitableTableRowProps) => {
	let rowClassName = `profitable-table-row`;
	if (index % 2 !== 0) rowClassName += ` profitable-table-row_dark`;

	return (
		<div className={rowClassName}>
			<h3>{stock.ticker}</h3>
			<h3>{stock.companyName}</h3>
			<h3>Акция</h3>
			<h3>{stock.growthPercent.toFixed(2)}%</h3>
		</div>
	);
};
