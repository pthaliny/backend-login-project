//Vai receber e levar a entrega pros outros arquivos
import * as userService from '../services/userService.js';

//função que vai ser chamada dependendo da rota
export async function createUser(req, res, next) {
    const { name, email, password } = req.body;

    try { //quando o service manda a requisição, ele entra aqui
        const newUser = await userService.createUser({ name, email, password });
        return res.status(201).json({ msg: "Usuário criado com sucesso!", newUser });
    } catch (error) {
        next(error); //padronização de string de erros, pra não ter erro não tratado
    }
};

//Vai pegar os parâmetros da requisição, sempre que eu precisar de um get (consultar)
export async function getUser(req, res, next) {
    const { id } = req.params;
    try {
        const getUser = await userService.readUserById(id);
        return res.status(200).json({ msg: "Usuário encontrado!", getUser });
    } catch (error) {
        next(error);
    }

};