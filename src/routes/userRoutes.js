import express from 'express';
import {createUser, getUser} from '../controllers/userController.js';
//import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();
router.post('/', createUser);
router.get('/id', getUser);

export default router;


const jwt = require("jsonwebtoken");

// Private Route - Rota p/ consultar um usuário, verificando se o token é válido e protegendo a rota
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // checa se o usuário existe no banco
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
});

// Precisa de um token para acessar a api de consulta
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  // Verifica se o token está correto
  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}