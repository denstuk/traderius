import { injectable } from "inversify";
import { ICandle, INominal } from "./types";

@injectable()
export class TinkoffV1Converter {
	convertCandles(candles: ICandle[]): { open: number; close: number; high: number; volume: number }[] {
		return candles.map((candle) => {
			return {
				open: +`${candle.open.units}.${candle.open.nano}`,
				close: +`${candle.close.units}.${candle.close.nano}`,
				high: +`${candle.high.units}.${candle.high.nano}`,
				volume: +candle.volume,
			};
		});
	}

	convertNominal(nominal: INominal): number {
		return +`${nominal.units}.${nominal.nano}`;
	}
}
