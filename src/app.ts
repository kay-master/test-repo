import express from "express";
import BasketController from "./controllers/BasketController";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("ENV", process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.use("/baskets", router.get("/", BasketController));

export default app;
