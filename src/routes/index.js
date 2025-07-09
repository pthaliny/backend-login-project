//Todas as rotas da api ficarão neste arquivo, pra que não seja preciso chama-las manualmente
import auth from '../routes/authRoutes.js';
import user from '../routes/userRoutes.js';

//comunicação com o arquivo app.js
const routers = (app) => {

  // Public - Rota para acessar a api
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api criada e funcionando!!" });
  });

  //rotas das minhas apis
  app.use('/auth', auth);
  app.use('/user', user);

};
export default routers;