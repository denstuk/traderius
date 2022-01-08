import * as React from "react";
import {PageTitle} from "../../components/Page/PageTitle/PageTitle";
import {PredictionForm} from "../../components/PredictionForm/PredictionForm";

export const PredictionPage: React.FC = () => {
    return (
        <div className="prediction">
            <PageTitle title="Аналитика" />
            <PredictionForm  />
        </div>
    );
}
