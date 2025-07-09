import corsOptions from "./config/corsOptions.js";
import dbConnect from "./config/database.js";
import express from 'express';

const app = express();
app.use(express.json());

app.use(cors(corsOptions));
dbConnect ();

export default app;

//Esse arquivo era onde estavam todas as partes do projeto: Conexão, validação, criação de rotas, etc. Agora, ele se tornou o arquivo de inicialização da aplicação.