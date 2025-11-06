const e = require('express');
var express = require('express');
var apiRouterV2 = express.Router();

const knex = require('knex')(require('../knexfile').development);


apiRouterV2.get('/filmes', function(req, res, next) {
  knex('filmes')
    .leftJoin('filmes_genero', 'filmes.id_filme', '=', 'filmes_genero.id_filme')
    .leftJoin('generos', 'filmes_genero.id_genero', '=', 'generos.id_genero')
    .select('filmes.dsc_filme')
    .select(knex.raw("GROUP_CONCAT(generos.dsc_genero SEPARATOR ', ') AS dsc_generos"))
    .groupBy('filmes.id_filme')
    .then(filmes => {
      res.status(200).json(filmes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar filmes' });
    });
});

apiRouterV2.get('/produtos/:id', function(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  knex('produtos')
    .where({ id })
    .first()
    .then(produto => {
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(produto);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    });
});
apiRouterV2.post('/produtos', function(req, res, next) {
  let produto = req.body;
  knex('produtos')
    .insert(produto, ['id'])
    .then(produtos => {
      if (!produtos.length) {
        res.status(400).json({ error: "Erro ao criar produto" });
        return
      }
      else {
        let newId = produtos[0].id;
        res.status(201).json({message: "Produto criado com sucesso", id: newId});
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar produto' });
    });
});
apiRouterV2.delete('/produtos/:id', function(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  knex('produtos')
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        return res.status(200).json({ message: "Produto removido com sucesso" });
      } else {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao remover produto' });
    });
});
apiRouterV2.put('/produtos/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  produto = req.body;
  if (id) {
    knex('produtos')
      .where({ id })
      .update(produto)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Produto atualizado com sucesso" });
        } else {
          res.status(404).json({ error: "Produto não encontrado" });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
      });
  } else {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

module.exports = apiRouterV2;
