import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import express from "express";
import routers from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

routers(app);
app.use(errorHandler);

export default app;

//aqui inicio os módulos necessários pra poder iniciar a app