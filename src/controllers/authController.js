import * as authService from '../services/authService.js';

export async function loginAccess(req, res, next) {
    const {email, password} = req.body;

    try {
        //consulta o mnétodo login no authservice e o service vai verificar se ele existe, senha ta certa e se o token foi criado e inserido ao usuário
        const token = await authService.loginAccess(email, password);
        return res.status(200).json({ msg: "Autenticado com sucesso!", token }) //se tiver tudo certo permite o login
    } catch (error) {
        next(error);
    }
}