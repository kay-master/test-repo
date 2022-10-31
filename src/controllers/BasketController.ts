import path from "path";
import { Request, Response } from "express";
import ProcessData from "./ProcessData";

async function BasketController(req: Request, res: Response) {
	try {
		const inputFile = path.join(__dirname, "../../input.json");
		const outputPath = path.join(__dirname, "../../output.json");

		const instance = new ProcessData(inputFile, outputPath);

		const data = await instance.run();

		return res.json({
			success: true,
			data,
		});
	} catch (error) {
		console.error(error);

		return res.status(400).json({
			success: false,
			error: "Internal server error",
		});
	}
}

export default BasketController;
