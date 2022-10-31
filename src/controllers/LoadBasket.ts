import getFileContents from "./fileUtil";
import { DataInterface } from "../interfaces/data.interface";

abstract class LoadBasket {
	private filePath: string;
	public baskets: DataInterface[] = [];

	constructor(filePath: string) {
		this.filePath = filePath;
		this.baskets = [];
	}

	private toJSON(input: string) {
		return JSON.parse(input) as DataInterface[];
	}

	public async loadData() {
		const contents = await getFileContents(this.filePath);

		this.baskets = this.toJSON(contents);
	}
}

export default LoadBasket;
