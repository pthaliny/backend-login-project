import mongoose from "mongoose";

const dbConnect = async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;

  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.awle9lz.mongodb.net/`,
    );
    console.log("Conectado ao MongoDB Atlas");

  } catch (error) {
    console.error("Erro de conexão com o MongoDB:", error);
    process.exit(1);
  }

  return mongoose.connection;
};

export default dbConnect;