//restrições das requisições
import bcrypt from bcrypt;
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export async function loginAccess(email, senha) {
    if (!email) {
        return res.status(400).json({ msg: "Digite o e-mail" });
    }
    if (!password) {
        return res.status(400).json({ msg: "Digite uma senha" });
    }
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
        return res.status(400).json({ msg: "Credenciais inválidas" });
    }

    //cria o token e vincula ao usuário
    const token = jwt.sign({ id: userExists._id, tokenVersion: userExists.tokenVersion }, process.env.SECRET);
    await userExists.save();

}   return {token}