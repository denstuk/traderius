import regression from "regression";
import { PricePoint } from "./analysis.types";
import { injectable } from "inversify";

@injectable()
export class Regressor {
	calculateLinear(points: PricePoint[]): PricePoint {
		const regressor = regression.linear(points);
		return regressor.predict(points.length + 1);
	}

	calculatePolynomial(points: PricePoint[]): PricePoint {
		const regressor = regression.polynomial(points);
		return regressor.predict(points.length);
	}

	calculatePower(points: PricePoint[]): PricePoint {
		const regressor = regression.power(points);
		return regressor.predict(points.length);
	}

	calculateExponential(points: PricePoint[]): PricePoint {
		const regressor = regression.exponential(points);
		return regressor.predict(points.length);
	}
}
