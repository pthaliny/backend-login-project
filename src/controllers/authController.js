import * as authService from "../services/authService.js";

export async function registerUser(req, res, next) {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const newUser = await authService.registerUser({
      name,
      email,
      password,
      confirmpassword,
    });

    return res.status(201).json({
      msg: "Usuário criado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginAccess(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginAccess(email, password);

    return res.status(200).json({
      msg: "Autenticado com sucesso!",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}
