import "dotenv/config";
import app from "./app.js";
import dbConnect from "./config/database.js";

//definindo a porta, se não estiver disponível então chama outra porta
const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await dbConnect(); // aguardar a conexão antes de iniciar o servidor
    const server = app.listen(port, () => {
      console.log(`Server iniciou em:`, port); //se o servidor iniciar, mostra onde foi
    });

    server.on("error", (error) => {
      console.error("Erro ao inicializar o servidor: ", error.message);
      process.exit(1); //se não conseguir conectar, encerra e mostra o log
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco: ", err);
    process.exit(1); //se der erro na conexão encerra e mostra o erro (não rodar sem banco)
  }
};

startServer(); //função que inicia o processo

//aqui inicio o servidor e a conexão com o banco