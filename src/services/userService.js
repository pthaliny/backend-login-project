//Lógica de negócio do usuário fica neste arquivo (validações funcionais)
import bcrypt from 'bcrypt';
import User from '../models/User';

//Serviço de validação da criação do usuário. Validações das funções (campo obrigatório, crítica de senha, usuário existe, etc.)
//recebe a requisição do controller e dá a resposta baseada no que foi passado e em qual validação irá cair esses dados
export async function createUser(name, email, password, confirmPassword) {
    if (!name) {
        return res.status(400).json({ msg: "Digite o nome do usuário" });
    }

    if (!email) {
        return res.status(400).json({ msg: "Digite o e-mail" });
    }

    if (!password) {
        return res.status(400).json({ msg: "Digite uma senha" });
    }

    if (password != confirmPassword) {
        return res
            .status(400)
            .json({ msg: "Senhas não coincidem" });
    }

    //Valida se o e-mail já está sendo usado
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(400).json({ msg: "E-mail já registrado, utilize outro endereço de e-mail." });
    }

    //Encriptando a senha: ta capturando o valor passado na senha e criando uma hash de tamanho 12
    const passwordHash = await bcrypt.hash(password, 12);
    const createUser = await User.create({
        name, email, password: passwordHash
    });

    //Se passar por todas as validações (regras) vai retornar pro controller
    return createUser;
};

export async function getUser(id) {
    //Quando listar o usuário, a senha não vai aparecer
    const getUser = await User.findById(id).select('-password');

    if (!getUser) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return getUser;
};