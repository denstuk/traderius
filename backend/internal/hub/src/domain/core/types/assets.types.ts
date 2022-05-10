export enum TraderiusAssetProvider {
	TinkoffInvest = "TinkoffInvest",
	Binance = "Binance",
}

export interface ITraderiusAsset {
	id: string;
	externalId: string;
	name: string;
	provider: TraderiusAssetProvider;
}
