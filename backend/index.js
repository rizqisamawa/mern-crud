import cors from "cors";
import express from "express";
import FileUpload from "express-fileupload";
import UserRouter from "./routes/UserRoute.js";

const app = express();

app.use(cors()); // adding middelware
app.use(express.json()); // recieve request format json
app.use(FileUpload()); // adding fileupload anything type file
app.use(express.static("public"));

app.use(UserRouter);

app.listen(5000, () => console.log("Server app running...."));
