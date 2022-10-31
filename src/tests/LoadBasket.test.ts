import path from "path";
import LoadBasket from "../controllers/LoadBasket";

class TestLoadBasket extends LoadBasket {
	constructor(path: string) {
		super(path);
	}
}

describe("File read contents", () => {
	it("Should return contents of a given file", async () => {
		const inputPath = path.join(__dirname, "../../input.json");

		const ds = new TestLoadBasket(inputPath);

		await ds.loadData();

		expect(ds.baskets.length).toBeGreaterThanOrEqual(1);
		expect(ds.baskets[0]).toHaveProperty("contents");
		expect(ds.baskets[0].contents.length).toBeGreaterThanOrEqual(3);
		expect(ds.baskets[0].contents[0]).toMatchObject({
			type: "apple",
			color: "green",
			weight: 1.5,
		});
	});
});
