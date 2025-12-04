import auth from "./authRoutes.js";
import user from "./userRoutes.js";

const routers = (app) => {
  //rota de inicialização do servidor
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api funcionando! :)" });
  });

  app.use("/auth", auth);
  app.use("/user", user);
};

export default routers;
