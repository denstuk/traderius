import { inject, injectable } from "inversify";
import { Regressor } from "../../../domain/analysis/regressor";
import { Configuration, TinkoffMarket } from "../../../infra";
import { PricePoint } from "../../../domain/analysis/analysis.types";

@injectable()
export class AnalysisController {
	constructor(@inject(Regressor) private regressor: Regressor) {}

	async analysis({ ticker }: { ticker: string }): Promise<{
		points: PricePoint[];
		regressions: { linear: PricePoint; polynomial: PricePoint; };
		lstm: PricePoint;
	}> {
		const market = new TinkoffMarket(Configuration.get("TinkoffSharedToken"));
		const historical = await market.history(ticker);
		const points: PricePoint[] = historical.candles.map((h, i) => [h.c, i]);
		const linear = this.regressor.calculateLinear(points);
		const polynomial = this.regressor.calculatePolynomial(points);
		return { points, regressions: { linear, polynomial }, lstm: [2, 2] };
	}
}
