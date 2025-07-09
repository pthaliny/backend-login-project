import 'dotenv/config';
import app from './app.js';

/* Inicializa o servidor da aplicação. Caso a porta definida não esteja disponível, vai chamar outra porta.
    Caso não inicialize por algum motivo, vai printar a mensagem de erro e finalizar a operação */
const port = process.env.PORT || 3000;
const startServer = () => {
    app.listen(port, ()=> {
        console.log(`Servidor incializado na porta http://localhost:${port}`);
    }).on('error', (error) => {
        console.log("Erro ao inicializar o servidor: ", error.message);
        process.exit(1);
    })
}

startServer();