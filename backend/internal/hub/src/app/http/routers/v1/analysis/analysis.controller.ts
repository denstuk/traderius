import { inject, injectable } from "inversify";
import { Regressor } from "../../../../../domain/analysis/regressor";
import { Configuration } from "../../../../../infra";
import { PricePoint } from "../../../../../domain/analysis/analysis.types";
import { Predictor } from "../../../../../infra/predictor";
import dayjs from "dayjs";
import {
	CandleInterval,
	InstrumentIdentifierType,
	TinkoffV1Client,
	TinkoffV1Converter,
} from "../../../../../infra/markets";

@injectable()
export class AnalysisController {
	constructor(
		@inject(Regressor) private readonly regressor: Regressor,
		@inject(Predictor) private readonly predictor: Predictor
	) {}

	async analysis({ ticker }: { ticker: string }): Promise<{
		points: PricePoint[];
		regressions: { linear: PricePoint; polynomial: PricePoint };
		lstm: { lstm30: number; lstm7: number };
	}> {
		const tinkoffMarketV1 = new TinkoffV1Client(Configuration.get("TinkoffSharedToken"));

		const { instrument } = await tinkoffMarketV1.getInstrumentBy({
			idType: InstrumentIdentifierType.InstrumentIdTypeTicker,
			id: ticker,
		});

		const now = dayjs();
		const lastMonth = now.subtract(3, "month").toISOString();

		const { candles } = await tinkoffMarketV1.getCandles({
			figi: instrument.figi,
			from: lastMonth,
			to: now.toISOString(),
			interval: CandleInterval.Day,
		});

		const mappedCandles = new TinkoffV1Converter().convertCandles(candles);

		const points: PricePoint[] = mappedCandles.map((h, i) => [h.close, i]);
		const linear = this.regressor.calculateLinear(points);
		const polynomial = this.regressor.calculatePolynomial(points);
		const lstmResult = await this.predictor.predict(points.map((p) => p[0]));
		return { points, regressions: { linear, polynomial }, lstm: { ...lstmResult.prediction } };
	}
}
