import React from "react";
import "./ProfitableTable.scoped.sass";
import { IProfitableStock, useApi } from "../../../domain";
import { PuffLoader } from "../PuffLoader/PuffLoader";
import {ProfitableTableRow} from "./ProfitableTableRow/ProfitableTableRow";

export const ProfitableTable: React.FC = () => {
    const { loading, data } = useApi<IProfitableStock[]>({ url: "http://localhost:9801/api/v1/stocks/profitable" });

    return (<div className="profitable-table">
        <h2 className="profitable-table__title">Лучший прогноз на неделю</h2>
        {
            loading ? (<PuffLoader isLoading={loading} />) : (<React.Fragment>
                {
                    data && data.splice(-20).map((stock) => <ProfitableTableRow key={`profitable:${stock.ticker}`} stock={stock} />)
                }
            </React.Fragment>)
        }
    </div>);
}
