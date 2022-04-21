import { injectable } from "inversify";

@injectable()
export class RoiCalculator {
	/**
	 * https://www.investopedia.com/articles/basics/10/guide-to-calculating-roi.asp
	 * @param from Initial stock price
	 * @param to Predicted stock price
	 * @param commission Commission percent
	 * @param amount Stocks amount
	 */
	calculate(from: number, to: number, commission: number, amount: number): number {
		const increased = to - from;
		const income = increased * amount;
		const spend = from * amount;
		const percent = commission / 100;
		return ((income - percent * spend) / spend) * 100;
	}
}
