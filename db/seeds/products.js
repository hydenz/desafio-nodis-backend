const getRandomGtin = () =>
  Math.floor(Math.random() * 10000000000000).toString();

const getImages = (imgsPath) =>
  JSON.stringify(
    Array.from(Array(5)).map((e, i) => `${imgsPath}/${i + 1}.webp`)
  );

// Informações dos produtos retirados de https://www.casasbahia.com.br

const products = [
  {
    name: 'Refrigerador Consul CRD37EB',
    gtin13: getRandomGtin(),
    description:
      'Facilidade na limpeza, qualidade e confiança Consul para você! Com essa geladeira você terá um melhor aproveitamento dos espaços, o freezer tem divisões que permitem acomodar mais itens e recipientes maiores. Também conta com gavetão de legumes transparente que mantém a temperatura e umidade adequadas para o armazenamento de frutas e hortaliças, preservando suas características naturais e cesta de porta-ovos portátil para 12 unidades, fácil de transportar e empilham-se, otimizando espaço.',
    images: getImages('consul-crd37eb'),
    price: 1899.99 * 100,
    quantity: 20,
  },
  {
    name: 'Smart TV LED 32" HD Samsung T4300',
    gtin13: getRandomGtin(),
    description:
      'Acesse suas músicas, filmes, notícias, jogos e redes sociais tudo em uma única tela, com o sistema operacional Tizen da Smart TV LED 32" HD Samsung T4300. Explore diversos aplicativos incluindo o Netflix e assista a séries e filme aclamados pela crítica, tudo isso em uma plataforma Smart rápida e intuitiva. Você também pode usar o recurso de Espelhamento de Tela para acessar conteúdos do seu Smartphone direto na tela da TV, ou se preferir, conecte um dispositivo USB e acesse seus arquivos. Tudo isso, em uma tela de alta resolução HD e tecnologia HDR que proporciona mais brilho e contraste para você aproveitar seu programa tanto nas cenas mais escuras quanto nas de alta luminosidade.',
    images: getImages('samsung-t4300'),
    price: 1399.99 * 100,
    quantity: 50,
  },
  {
    name: 'Forno de Micro-ondas Electrolux MEF41',
    gtin13: getRandomGtin(),
    description:
      'O Micro-ondas MEF41 da Electrolux atende a quem gosta de pratos diferenciados, mas não abre mão da praticidade. Ele conta com o menu Gourmet que possui funções pré-programadas para preparar risoto, tomate seco e strogonoff. No menu Meus Favoritos é possível gravar suas 3 receitas mais utilizadas para agilizar seu dia-a-dia. O MEF41 possui também menus especiais com receitas já programadas na memória como o Kids e o Light. O menu Kids atende às preferências das crianças e oferece as teclas Pipoca, Hambúrguer e Brigadeiro. Enquanto isso, o menu Light é perfeito para quem prefere pratos mais saudáveis, com menos gordura, mas sem deixar o sabor de lado, contando com as teclas Frutas, Vegetais e Sopas.',
    images: getImages('electrolux-mef41'),
    price: 549.99 * 100,
    quantity: 70,
  },
  {
    name: 'Monitor Gamer Samsung 24" SD332',
    gtin13: getRandomGtin(),
    description:
      'Ultrarrápido e cheio de recursos, o Monitor Gamer Samsung 24" SD332 chegou para melhorar a sua performance para as próximas conquistas. Com o tempo de resposta de 1ms ultrarrápido é excelente para games de ação que exigem reflexos rápidos e precisos. Prepare-se para momentos eletrizantes. Jogue por horas a fio sem o risco de prejudicar olhos e causar fadiga ocular. O Samsung Gaming Monitor tem a inovadora tecnologia Flicker-Free, reduz a tremulação causada pelo brilho da tela e evita o cansaço dos olhos depois de passar horas de frente para o monitor. A configuração de brilho automático ajusta o brilho da tela, com base na luminescência dos pretos, reduzindo o consumo de energia.',
    images: getImages('samsung-sd332'),
    price: 899.99 * 100,
    quantity: 30,
  },
  {
    name: 'Impressora HP Laser 107w Wireless',
    gtin13: getRandomGtin(),
    description:
      'Desempenho de laser a um preço acessível. Obtenha desempenho de impressão produtivo a um preço acessível. Produza resultados de alta qualidade e imprima e digitalize a partir de seu smartphone.',
    images: getImages('hp-107w'),
    price: 899.99 * 100,
    quantity: 20,
  },
];

exports.seed = async function (knex) {
  await knex('products').del();
  await knex.raw('ALTER TABLE ' + 'products' + ' AUTO_INCREMENT = 1');
  return knex('products').insert(products);
};
