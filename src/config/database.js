import mongoose from "mongoose";

//Arquivo de conexão com o banco de dados. Caso não conecte por algum motivo, vai trazer a mensagem de erro e encerrar o processo.
const dbConnect = async () => {

    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;

    try {
        await mongoose
            .connect(
                `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ldani.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
            )
    } catch (error) {
        console.log(error);
        process.exit(1);
    } return mongoose.connection;
}
export default dbConnect;