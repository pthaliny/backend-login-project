//padronizador de erros do sistema: as mensagens de resposta sempre vão estar nesse formato (código de erro/status + mensagem)
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Erro interno";
  console.error(err.message);
  return res.status(status).json({ msg: message });
};