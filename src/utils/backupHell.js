import User from "../models/User";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// // Registrar usuário - Cadastrar um usuário colocando a senha usando bcrypt, que vai criar uma hash pra dar mais segurança
// app.post("/auth/register", async (req, res) => {
//   const { name, email, password, confirmpassword } = req.body;
//   console.log(req.body);
//   // validations
//   if (!name) {
//     return res.status(422).json({ msg: "Digite o nome do usuário" });
//   }

//   if (!email) {
//     return res.status(422).json({ msg: "Digite o e-mail" });
//   }

//   if (!password) {
//     return res.status(422).json({ msg: "Digite uma senha" });
//   }

//   if (password != confirmpassword) {
//     return res
//       .status(422)
//       .json({ msg: "Senhas não coincidem" });
//   }

//   // validação, pra checar se o usuário existe no sistema
//   const userExists = await User.findOne({ email: email });

//   if (userExists) {
//     return res.status(422).json({ msg: "E-mail já registrado, utilize outro endereço de e-mail." });
//   }

//   // criar e salvar uma senha com hash
//   const salt = await bcrypt.genSalt(12);
//   const passwordHash = await bcrypt.hash(password, salt);

//   // criar usuário e salvar no mongo
//   var user = new User();
//   user.password = passwordHash;
//   user.name = req.body.name;
//   user.email = req.body.email;

  try {
    await user.save(); 

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

async function checkUser(password, hash_password) {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, hash_password);

  if (match) {
    return true;
  }
}

// Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

//   // validações de dados obrigatórios
//   if (!email) {
//     return res.status(422).json({ msg: "Informe seu e-mail" });
//   }

//   if (!password) {
//     return res.status(422).json({ msg: "Informe a senha" });
//   }

//   // check if user exists  
//   const user = await User.findOne({ email: email });

//   if (!user) {
//     return res.status(404).json({ msg: "Usuário não registrado" });
//   }

  var salt2 = await bcrypt.genSalt(12);
  var passwordHash2 = await bcrypt.hash(password, salt2);
  console.log("senha do usuario: ", user);

  var result = await checkUser(password, user.password);
  if (!result) {
    return res.status(422).json({ msg: "E-mail ou senha inválido(s)" });
  }

  // usuário logado com sucesso
  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});