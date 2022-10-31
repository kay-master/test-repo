import supertest from "supertest";
import app from "../app";

const desiredResults = [
	{
		id: "1ceb8c95-736f-4da3-86d9-86d55893b38a",
		total_fruits: 3,
		total_weight: 5,
		fruit_counts: [
			{
				type: "apple",
				count: 2,
			},
			{
				type: "pear",
				count: 1,
			},
		],
	},
];

describe("GET /baskets", () => {
	it("Should return exact data structure", async () => {
		const results = await supertest(app)
			.get("/baskets")
			.expect("Content-Type", /json/)
			.expect(200);

		const { body } = results;

		expect(body.success).toBe(true);
		expect(body).toHaveProperty("data");
		expect(body.data).toMatchObject(desiredResults);
	});

	it("Should fail as results are not the same", async () => {
		const results = await supertest(app)
			.get("/baskets")
			.expect("Content-Type", /json/)
			.expect(200);

		const { body } = results;

		expect(body.success).toBe(true);
		expect(body.data.length).toBeGreaterThan(0);
		expect(body.data[0].total_fruits).toEqual(3);
		expect(body.data[0].total_weight).not.toEqual(4);
	});
});
