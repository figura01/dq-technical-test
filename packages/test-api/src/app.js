// Libs
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
// import cors from "cors";

// import configDb from './config/dbConnection';

import { routes } from "./routes";


const path = require("path");
// Connects to the Database -> then starts the express
// Create a new express application instance
export const app = express();

app.use(express.static(path.join(__dirname, "public")));

const cors = require('cors');
const usersRouter = require("./routes/users");
const teamsRouter = require("./routes/teams");
// Call midlewares

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(helmet());
app.use(
    bodyParser.json({
        verify(req, res, buf) {
            req.rawBody = buf;
        },
        limit: "70mb",
    })
);

// Set all routes from routes folder
app.use("/", routes);
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
