import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function createUser({ name, email, password, confirmPassword }) {
  if (!name) throw { status: 400, message: "Digite o nome do usuário" };
  if (!email) throw { status: 400, message: "Digite o e-mail" };
  if (!password) throw { status: 400, message: "Digite uma senha" };
  if (password !== confirmPassword) throw { status: 400, message: "Senhas não coincidem" };

  const userExists = await User.findOne({ email });
  if (userExists) throw { status: 400, message: "E-mail já registrado, utilize outro endereço de e-mail." };

  //hash da senha
  const passwordHash = await bcrypt.hash(password, 12);
  const createdUser = await User.create({
    name,
    email,
    password: passwordHash
  });

  //não retornar a senha
  const userSafe = createdUser.toObject();
  delete userSafe.password;
  return userSafe;
}

export async function readUserById(id) {
  if (!id) throw { status: 400, message: "Id do usuário é obrigatório" };

  const user = await User.findById(id).select("-password");
  if (!user) throw { status: 404, message: "Usuário não encontrado" };

  return user;
}
