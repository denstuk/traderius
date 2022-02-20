import axios from "axios";
import {PredictionResponse} from "./predictor.types";
import {injectable} from "inversify";

@injectable()
export class Predictor {
	async predict(values: number[]): Promise<PredictionResponse> {
		const response = await axios({ url: "http://127.0.0.1:9803/predict", method: "POST", data: { values } });
		return response.data as PredictionResponse;
	}
}
