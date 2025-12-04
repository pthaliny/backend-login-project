//Verifica a autenticação, se o usuário está apto a logar baseado no token
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(token, secret);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido!" });
  }
}
