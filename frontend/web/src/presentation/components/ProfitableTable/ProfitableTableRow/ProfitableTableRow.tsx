import React from "react";
import "./ProfitableTableRow.scoped.sass";
import { IProfitableStock } from "../../../../domain";

type ProfitableTableRowProps = { stock: IProfitableStock };

export const ProfitableTableRow: React.FC<ProfitableTableRowProps> = ({ stock }: ProfitableTableRowProps) => {
  return (<div className="profitable-table-row">
    <h3>{stock.ticker}</h3>
    <h3>Apple Inc.</h3>
    <h3>Акция</h3>
    <h3>{stock.predicted.toFixed(2)}%</h3>
  </div>);
};
