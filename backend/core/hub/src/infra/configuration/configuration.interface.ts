export interface IConfiguration {
	Env: string;
	Port: number;
	Host: string;
	RedisHost: string;
	RedisPort: number;
	RedisPass: string;
	ServiceId: string;
	NewsRapidHost: string;
	NewsRapidKey: string;
	Secret: string;
	TinkoffSharedToken: string;
	TinkoffApiUrl: string;
	TinkoffWsUrl: string;
	KafkaServer: string;
	KafkaClientId: string;
}
