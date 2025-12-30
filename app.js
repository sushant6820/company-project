import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import mongoConnect from "./dbconnect/db.connection.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4008;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

mongoConnect();
app.use("/api", userRouter);

app.listen(port, ()=>{
    console.log(`the server is running on port number ${port}`)
})
