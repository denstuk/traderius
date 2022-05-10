import { injectable } from "inversify";
import {
	CandleInterval,
	InstrumentIdentifierType,
	OrderDirectionType,
	OrderType,
	TinkoffV1Client,
	TinkoffV1Converter,
} from "../../../infra/markets";
import { UserEntity } from "../../users/entities/user.entity";
import { TinkoffTraderMarketNotConnectedException } from "./exceptions/tinkoff-trader-market-not-connected.exception";
import { StocksAnalysis } from "../../analysis/stocks-analysis/stocks-analysis";
import { ioc } from "../../../ioc";
import { IBalance, ITraderService } from "../traders.types";
import { TinkoffTraderAccountNotFoundException } from "./exceptions/tinkoff-trader-account-not-found.exception";
import dayjs from "dayjs";

@injectable()
export class TinkoffTraderService implements ITraderService {
	private readonly stocksAnalysisService: StocksAnalysis = ioc.resolve(StocksAnalysis);
	private readonly tinkoffConverter: TinkoffV1Converter = ioc.resolve(TinkoffV1Converter);

	async trade(params: unknown, user: UserEntity): Promise<void> {
		const market = this.getTinkoffMarketClient(user);

		const stocks = await this.stocksAnalysisService.getMostProfitable();
		if (!stocks.length) return;

		const account = await market.getAccessibleAccount();
		if (!account) throw new TinkoffTraderAccountNotFoundException();

		const balance: IBalance = (await market.getAccessibleAccountBalance()) as IBalance;

		for (const stock of stocks) {
			const { instrument } = await market.getInstrumentBy({
				idType: InstrumentIdentifierType.InstrumentIdTypeTicker,
				id: stock.ticker,
			});

			const now = dayjs();
			const past = now.subtract(5, "minutes");

			const { candles } = await market.getCandles({
				interval: CandleInterval.Min1,
				figi: instrument.figi,
				from: past.toISOString(),
				to: now.toISOString(),
			});

			const last = candles[candles.length - 1];
			const price = last.close;

			if (instrument && instrument.buyAvailableFlag) {
				await market.buyAsset({
					figi: instrument.figi,
					direction: OrderDirectionType.Buy,
					accountId: account.id,
					orderType: OrderType.Market,
				});
				break;
			}
		}
	}

	private getTinkoffMarketClient(user: UserEntity): TinkoffV1Client {
		if (!user.tinkoffMarketToken) throw new TinkoffTraderMarketNotConnectedException();
		return new TinkoffV1Client(user.tinkoffMarketToken);
	}
}
