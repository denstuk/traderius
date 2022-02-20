import * as React from "react";
import "./PredictionForm.scoped.sass";

type PredictionFormProps =  { setTicker: (value: string) => void; ticker: string; onAnalysisClick: () => Promise<void> }

export const PredictionForm: React.FC<PredictionFormProps> = (props: PredictionFormProps): React.ReactElement => {
	return (
		<div className="prediction-form">
			<div className="prediction-form__search">
				<h2>Введите тикер ценной бумаги:</h2>
				<input
					placeholder="AAPL"
					onChange={(e) => props.setTicker(e.target.value)}
					value={props.ticker}
				/>
			</div>
			<button onClick={() => props.onAnalysisClick()}>Анализ</button>
		</div>
	);
};
