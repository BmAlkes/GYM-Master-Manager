const express = require("express");
const routes = express.Router();
const instructors = require('./controllers/instructors');
const members = require("./controllers/members")

routes.get("/", function (req, res) {
  return res.redirect("instructors");
});
routes.get("/instructors",instructors.index );
routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create");
});
routes.post("/instructors", instructors.post) 
//HTTP VERBS
// GET :RECEBER RESOURCE
// POST: CRIAR OU SALVAR UM NOVO RESOURCE COM DADOS ENVIADOS
//PUT : ATUALIZAR
// DELETE :DELETAR
routes.put("/instructors", instructors.put)
routes.get("/instructors/:id",instructors.show)
routes.get("/instructors/:id/edit",instructors.edit)
routes.delete("/instructors",instructors.delete)



routes.get("/members",members.index );
routes.get("/members/create", members.create)
routes.post("/members", members.post) 
routes.put("/members", members.put)
routes.get("/members", function (req, res) {
  return res.send("/members");
});
routes.get("/members/:id",members.show)
routes.get("/members/:id/edit",members.edit)
routes.delete("/members",members.delete)

module.exports = routes;
