import {ioc} from "../../../../src/infra";
import {Regressor} from "../../../../src/domain/analysis/regressor";

describe("Domain: Analysis: Regressor", () => {
	const regressor = ioc.resolve(Regressor);

	test("should be defined", () => {
		expect(regressor).toBeDefined();
	});

	test("should return correct value", () => {
		const testData: [number, number][] = [[1, 1], [2, 2]];
		const prediction = regressor.calculateLinear(testData);
		expect(prediction).toBeDefined();
		expect(prediction[0]).toEqual(3);
		expect(prediction[1]).toEqual(3);
	});
});
