import {
	FruitContents,
	OutputInterface,
	DataInterface,
} from "../interfaces/data.interface";
import Basket from "./Basket";

class FruitBasket extends Basket {
	public aboveMaxWeight: boolean;

	constructor(basket: DataInterface) {
		super(basket);

		this.aboveMaxWeight = false;
	}

	private fruitCount(fruits: FruitContents[]) {
		const data: Record<string, number> = {};

		fruits.forEach((fruit) => {
			if (data[fruit.type]) {
				data[fruit.type] += 1;
			} else {
				data[fruit.type] = 1;
			}
		});

		return Object.entries(data).map((value) => {
			const [type, count] = value;

			return {
				type,
				count,
			};
		});
	}

	public processBasket(): OutputInterface {
		const data = this.basket;
		const totalWeight = this.checkWeight();

		this.aboveMaxWeight = totalWeight > data.max_weight;

		return {
			id: data.id,
			total_fruits: data.contents.length,
			total_weight: totalWeight,
			fruit_counts: this.fruitCount(data.contents),
		};
	}
}

export default FruitBasket;
