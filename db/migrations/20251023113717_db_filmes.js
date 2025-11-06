/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Criação da tabela generos
    .createTable('generos', function(table) {
      table.integer('id_genero').notNullable().primary(); // PRIMARY KEY (id_genero)
      table.string('dsc_genero', 255);
    })

    // Criação da tabela filmes
    .createTable('filmes', function(table) {
      table.integer('id_filme').notNullable().primary(); // PRIMARY KEY (id_filme)
      table.string('dsc_filme', 255);
      table.integer('qtd_votos');
      table.integer('num_nota_media');
      table.integer('num_popularidade');
      table.string('dsc_link_foto', 255);
      table.text('dsc_sinopse');
      table.dateTime('dat_lancamento'); // datetime
    })

    // Criação da tabela de relacionamento N:N (filmes_genero)
    .createTable('filmes_genero', function(table) {
      // Chave estrangeira para filmes
      table.integer('id_filme')
           .references('id_filme').inTable('filmes');

      // Chave estrangeira para generos
      table.integer('id_genero')
           .references('id_genero').inTable('generos');
      
      // O SQL original não define uma chave primária composta.
    });
};

exports.down = function(knex) {
  // A ordem é importante para remover as tabelas que dependem de outras primeiro
  return knex.schema
    .dropTableIfExists('filmes_genero')
    .dropTableIfExists('filmes')
    .dropTableIfExists('generos');
};
