import regression from "regression";

type Price = number;
type Index = number;
type PricePoint = [Index, Price];

export class Regressor {
	calculateLinear(points: [number, number][]): [number, number] {
		const regressor = regression.linear(points);
		return regressor.predict(points.length);
	}

	calculatePolynomial(points: PricePoint[]): PricePoint {
		const regressor = regression.polynomial(points)
		return regressor.predict(points.length);
	}
}
