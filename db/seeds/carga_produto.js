/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del();
  await knex('produtos').insert([
    { id: 1, descricao: 'Tênis running masculino, cabedal em mesh, amortecimento responsivo, cor preto', marca: 'Nike', preco: 399.90 },
    { id: 2, descricao: 'Tênis casual unissex, sola vulcanizada, acabamento em lona, cor branco', marca: 'Converse', preco: 249.90 },
    { id: 3, descricao: 'Tênis treino feminino, suporte de arco e entressola em EVA, cor rosa', marca: 'Adidas', preco: 329.90 },
    { id: 4, descricao: 'Tênis lifestyle unissex, solado macio e painel em camurça, cor marrom', marca: 'New Balance', preco: 379.90 },
    { id: 5, descricao: 'Tênis esportivo, cabedal respirável, solado de borracha resistente, cor azul', marca: 'Puma', preco: 279.90 },
    { id: 6, descricao: 'Tênis casual slip-on, tecido confortável, sola antiderrapante, cor preto', marca: 'Vans', preco: 219.90 },
    { id: 7, descricao: 'Tênis caminhada, palmilha memory foam, suporte extra no calcanhar, cor cinza', marca: 'Skechers', preco: 289.90 },
    { id: 8, descricao: 'Tênis running com amortecimento responsivo, cabedal em knit, cor verde', marca: 'Asics', preco: 349.90 },
    { id: 9, descricao: 'Bota casual em couro, forro confortável, solado robusto, cor marrom escuro', marca: 'Timberland', preco: 499.90 },
    { id: 10, descricao: 'Tênis performance para trilha, sola com tração reforçada, cor preto/laranja', marca: 'Salomon', preco: 459.90 },
    { id: 11, descricao: 'Sapato social masculino em couro, palmilha acolchoada, cor preto', marca: 'Ferracini', preco: 329.90 },
    { id: 12, descricao: 'Tênis retro unissex, design clássico, detalhe em couro, cor branco/bege', marca: 'Fila', preco: 199.90 },
    { id: 13, descricao: 'Bota estilo workwear, couro resistente, acabamento costurado, cor marrom', marca: 'Dr. Martens', preco: 589.90 },
    { id: 14, descricao: 'Chinelo borracha flip-flop, palmilha macia, ideal para praia, cor azul', marca: 'Havaianas', preco: 59.90 }
  ]);
};
