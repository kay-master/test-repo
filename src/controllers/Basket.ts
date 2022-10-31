import { DataInterface } from "../interfaces/data.interface";

abstract class Basket {
	public basket: DataInterface;

	constructor(basket: DataInterface) {
		this.basket = basket;
	}

	public checkWeight() {
		return this.basket.contents.reduce((prev, current) => {
			return prev + current.weight;
		}, 0);
	}
}

export default Basket;
