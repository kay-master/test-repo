import FruitBasket from "../controllers/FruitBasket";
import { OutputInterface } from "../interfaces/data.interface";

const desired = {
	id: "1ceb8c95-736f",
	total_fruits: 4,
	total_weight: 6,
	fruit_counts: [
		{
			type: "orange",
			count: 2,
		},
		{
			type: "apple",
			count: 2,
		},
	],
};

const input = {
	id: "1ceb8c95-736f",
	max_weight: 5,
	contents: [
		{
			type: "orange",
			color: "orange",
			weight: 1.5,
		},
		{
			type: "apple",
			color: "red",
			weight: 1,
		},
		{
			type: "apple",
			color: "red",
			weight: 1,
		},
		{
			type: "orange",
			color: "orange",
			weight: 2.5,
		},
	],
};

let fb: OutputInterface;
let aboveMaxWeight: boolean;

beforeEach(() => {
	const info = new FruitBasket(input);

	fb = info.processBasket();
	aboveMaxWeight = info.aboveMaxWeight;
});

describe("FruitBasket", () => {
	it("Should return desired data structure", () => {
		expect(fb).toMatchObject({
			...desired,
			total_weight: 6,
		});
	});

	it("aboveMaxWeight must be true", () => {
		expect(aboveMaxWeight).toBe(true);
	});
});
