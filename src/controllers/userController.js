import * as userService from "../services/userService.js";

export async function createUser(req, res, next) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await userService.createUser({ name, email, password, confirmPassword });
    return res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.readUserById(id);
    return res.status(200).json({ msg: "Usuário encontrado!", user });
  } catch (error) {
    next(error);
  }
}
