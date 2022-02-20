import { inject, injectable } from "inversify";
import { Regressor } from "../../../domain/analysis/regressor";
import { Configuration, TinkoffMarket } from "../../../infra";
import { PricePoint } from "../../../domain/analysis/analysis.types";
import { Predictor } from "../../../infra/predictor";

@injectable()
export class AnalysisController {
	constructor(@inject(Regressor) private regressor: Regressor, @inject(Predictor) private predictor: Predictor) {}

	async analysis({ ticker }: { ticker: string }): Promise<{
		points: PricePoint[];
		regressions: { linear: PricePoint; polynomial: PricePoint };
		lstm: { lstm30: number; lstm7: number };
	}> {
		const market = new TinkoffMarket(Configuration.get("TinkoffSharedToken"));
		const historical = await market.history(ticker);
		const points: PricePoint[] = historical.candles.map((h, i) => [h.c, i]);
		const linear = this.regressor.calculateLinear(points);
		const polynomial = this.regressor.calculatePolynomial(points);
		const lstmResult = await this.predictor.predict(points.map((p) => p[0]));
		return { points, regressions: { linear, polynomial }, lstm: { ...lstmResult.prediction } };
	}
}
