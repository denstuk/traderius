import * as React from "react";
import "./PredictionForm.css";

export const PredictionForm: React.FC = (): React.ReactElement => {
    return (
        <div className="prediction-form">
            <div className="prediction-form__search">
                <h2>Введите тикер акции:</h2>
                <input placeholder="APPL" />
            </div>
            <button>Анализ</button>
        </div>
    );
}
