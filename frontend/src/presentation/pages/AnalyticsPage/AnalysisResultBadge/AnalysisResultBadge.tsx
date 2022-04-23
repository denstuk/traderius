import React from "react";
import "./AnalysisResultBadge.scoped.sass";
import type { IAnalysis } from "../../../../domain";

type AnalysisResultBadgeProps = { analysis: IAnalysis };

export const AnalysisResultBadge: React.FC<AnalysisResultBadgeProps> = ({ analysis }: AnalysisResultBadgeProps) => {
    return (<div className="analysis-result-badge">
        <div className="badge-title">
            <h2>Результат прогнозирования</h2>
            <h3>Индикаторы актива:</h3>
        </div>
        <div className="analysis-result">
            <h2>Прогнозирования AI LSTM обученной на временном интервале 7 дней:</h2>
            <p>{ analysis.lstm.lstm7 }</p>
        </div>
        <div className="analysis-result">
            <h2>Прогнозирования AI LSTM обученной на временном интервале 30 дней:</h2>
            <p>{ analysis.lstm.lstm30 }</p>
        </div>
        <div className="analysis-result">
            <h2>Прогнозирования по алгоритму линейной регрессии:</h2>
            <p>{ analysis.regressions.linear[1] }</p>
        </div>
        <div className="analysis-result">
            <h2>Прогнозирования по алгоритму полиномиальной регрессии:</h2>
            <p>{ analysis.regressions.polynomial[1] }</p>
        </div>
    </div>);
}
