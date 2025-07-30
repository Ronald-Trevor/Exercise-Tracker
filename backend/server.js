import express from "express"
import cors from "cors";
import { mongoose } from "mongoose";
import exerciseRoute from "./routes/exercise.route.js";
import userRoute from "./routes/users.route.js"
import 'dotenv/config'

//require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

//Allow origins
app.use(cors());

//middle ware
app.use(express.json());


app.use("/exercises", exerciseRoute);
app.use("/users", userRoute)

mongoose.connect(uri)
    .then(() => {
        console.log("Database connection successful");
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error)
    });