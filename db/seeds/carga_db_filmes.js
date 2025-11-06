/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in the correct order to avoid FK errors
  await knex('filmes_genero').del();
  await knex('filmes').del();
  await knex('generos').del();

  // Dados para a tabela 'generos' (Todos os registros extraídos)
  const generos = [
    { id_genero: 27, dsc_genero: 'Terror' },
    { id_genero: 10402, dsc_genero: 'Música' },
    { id_genero: 9648, dsc_genero: 'Mistério' },
    { id_genero: 10749, dsc_genero: 'Romance' },
    { id_genero: 878, dsc_genero: 'Ficção científica' },
    { id_genero: 10770, dsc_genero: 'Cinema TV' },
    { id_genero: 53, dsc_genero: 'Thriller' },
    { id_genero: 10752, dsc_genero: 'Guerra' },
    { id_genero: 37, dsc_genero: 'Faroeste' },
    { id_genero: 28, dsc_genero: 'Ação' },
    { id_genero: 12, dsc_genero: 'Aventura' },
    { id_genero: 16, dsc_genero: 'Animação' },
    { id_genero: 35, dsc_genero: 'Comédia' },
    { id_genero: 80, dsc_genero: 'Crime' },
    { id_genero: 99, dsc_genero: 'Documentário' },
    { id_genero: 18, dsc_genero: 'Drama' },
    { id_genero: 10751, dsc_genero: 'Família' },
    { id_genero: 14, dsc_genero: 'Fantasia' },
    { id_genero: 36, dsc_genero: 'História' }
  ];

  // Dados para a tabela 'filmes' (Amostra de 2 filmes)
  const filmes = [
    {
      id_filme: 11,
      dsc_filme: 'Guerra nas Estrelas',
      qtd_votos: 6124,
      num_nota_media: 8,
      num_popularidade: 11492614,
      dsc_link_foto: 'http://image.tmdb.org/t/p/w185//70LaZP2LkQ2MUELgilwxj3dKBH0.jpg',
      dsc_sinopse: 'Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta ao cavaleiro jedi e a Han Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.',
      dat_lancamento: '1977-05-25 00:00:00',
    },
    {
      id_filme: 12,
      dsc_filme: 'Procurando Nemo',
      qtd_votos: 5506,
      num_nota_media: 76,
      num_popularidade: 10915573,
      dsc_link_foto: 'http://image.tmdb.org/t/p/w185//wc6k6nqoo5kAOMnkJsvUGuDScd8.jpg',
      dsc_sinopse: 'O passado reserva tristes memórias para Marlin nos recifes de coral, onde perdeu sua esposa e toda a ninhada. Agora, ele cria seu único filho Nemo com todo o cuidado do mundo, mas o pequeno e simpático peixe-palhaço acaba exagerando durante uma simples discussão e acaba sendo capturado por um mergulhador. Agora, o pai super protetor precisa entrar em ação e parte numa busca incansável pelo mar aberto, na esperança de encontrar seu amado filhote. No meio do caminho, ele acaba conhecendo Dory e, juntos, a dupla vai viver uma incrível aventura. Enquanto isso, Nemo também vive uma intensa experiência ao lado de seus novos amigos habitantes de um aquário, pois eles precisam ajudá-lo a escapar do destino que lhe foi reservado: ir parar nas mãos da terrível Darla, sobrinha do dentista que o capturou.',
      dat_lancamento: '2003-05-30 00:00:00',
    }
    // ... Adicione o restante dos filmes aqui
  ];

  // Dados para a tabela 'filmes_genero' (Amostra)
  const filmesGeneros = [
    { id_filme: 11, id_genero: 28 }, // Guerra nas Estrelas: Ação
    { id_filme: 11, id_genero: 12 }, // Guerra nas Estrelas: Aventura
    { id_filme: 11, id_genero: 14 }, // Guerra nas Estrelas: Fantasia
    { id_filme: 11, id_genero: 878 }, // Guerra nas Estrelas: Ficção científica
    { id_filme: 12, id_genero: 16 }, // Procurando Nemo: Animação
    { id_filme: 12, id_genero: 10751 }, // Procurando Nemo: Família
    { id_filme: 12, id_genero: 12 } // Procurando Nemo: Aventura
    // ... Adicione o restante dos relacionamentos aqui
  ];

  // Inserção dos dados
  await knex('generos').insert(generos);
  await knex('filmes').insert(filmes);
  await knex('filmes_genero').insert(filmesGeneros);
};
