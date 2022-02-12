import * as React from "react";
import "./PredictionForm.scoped.sass";

export const PredictionForm: React.FC = (): React.ReactElement => {
	return (
		<div className="prediction-form">
			<div className="prediction-form__search">
				<h2>Введите тикер ценной бумаги:</h2>
				<input placeholder="AAPL" />
			</div>
			<button>Анализ</button>
		</div>
	);
};
