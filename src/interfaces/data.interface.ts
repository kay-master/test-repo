export interface FruitContents {
	type: string;
	color: string;
	weight: number;
}

export interface FruitCount {
	type: string;
	count: number;
}

export interface DataInterface {
	id: string;
	max_weight: number;
	contents: FruitContents[];
}

export interface OutputInterface {
	id: string;
	total_fruits: number;
	total_weight: number;
	fruit_counts: FruitCount[];
}
