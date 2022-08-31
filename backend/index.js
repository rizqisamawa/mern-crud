import cors from "cors";
import express from "express";
import UserRouter from "./routes/UserRoute.js";

const app = express();

app.use(cors()); // adding middelware
app.use(express.json()); // recieve request format json

app.use(UserRouter);

app.listen(5000, () => console.log("Server app running...."));
