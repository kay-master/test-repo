import fs from "fs";

import FruitBasket from "./FruitBasket";
import { OutputInterface } from "../interfaces/data.interface";
import LoadBasket from "./LoadBasket";

class ProcessData extends LoadBasket {
	private outputPath: string;

	constructor(filePath: string, outputPath: string) {
		super(filePath);

		this.outputPath = outputPath;
	}

	private processBaskets() {
		const results: OutputInterface[] = [];

		for (const basket of this.baskets) {
			const instance = new FruitBasket(basket);

			// Check if is above max weight
			if (!instance.aboveMaxWeight) {
				results.push(instance.processBasket());
			}
		}

		return results;
	}

	private writeOutput(results: OutputInterface[]) {
		fs.writeFileSync(this.outputPath, JSON.stringify(results, null, 2));
	}

	public async run() {
		await this.loadData();

		const results = this.processBaskets();

		this.writeOutput(results);

		return results;
	}
}

export default ProcessData;
