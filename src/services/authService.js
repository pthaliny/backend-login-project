import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function registerUser({ name, email, password, confirmpassword }) {
  if (!name) throw { status: 400, message: "Digite o nome" };
  if (!email) throw { status: 400, message: "Digite o e-mail" };
  if (!password) throw { status: 400, message: "Digite uma senha" };
  if (password !== confirmpassword)
    throw { status: 400, message: "As senhas não conferem" };

  const userExists = await User.findOne({ email });
  if (userExists) throw { status: 409, message: "Usuário já registrado" };

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const safeUser = newUser.toObject();
  delete safeUser.password;

  return safeUser;
}

export async function loginAccess(email, password) {
  if (!email) throw { status: 400, message: "Digite o e-mail" };
  if (!password) throw { status: 400, message: "Digite uma senha" };

  const user = await User.findOne({ email });
  if (!user) throw { status: 404, message: "Usuário não encontrado" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "E-mail ou senha inválido(s)" };

  const secret = process.env.SECRET;
  if (!secret) throw { status: 500, message: "Configuração do servidor inválida (SECRET ausente)" };

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });

  const userSafe = user.toObject();
  delete userSafe.password;

  return { token, user: userSafe };
}
