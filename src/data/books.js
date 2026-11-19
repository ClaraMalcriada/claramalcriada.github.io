// Registry único de livros — PT + EN. Fonte única para App.jsx, build-static e build-blog.
export const amazonUrl = (lang, asin) =>
  lang === 'en'
    ? `https://www.amazon.com/dp/${asin}`
    : `https://www.amazon.com.br/dp/${asin}`;

export const BOOKS = [
  {
    id: 'a-arte-do-insulto-persa',
    cover: '/cover-a-arte-do-insulto-persa.png',
    coverEn: '/cover-a-arte-do-insulto-persa-en.png',
    editions: {
      pt: {
        title: 'A Arte do Insulto Persa',
        subtitle: 'Elegância, Metáforas e Crítica na Tradição Iraniana',
        series: 'Parte de: A Arte da Patada (4 livros)',
        price: 'R$ 9,99',
        kindleUnlimited: true,
        asin: 'B0FGNWW71K',
        blurb: 'Metáforas afiadas como versos de Hafez: humilhe com estética.',
        description:
          'Combinando erudição e irreverência, Clara Malcriada conduz o leitor por um jardim de espinhos poéticos onde o insulto é refinado como um verso de Hafez.',
        seo: {
          title: 'A Arte do Insulto Persa | Clara Malcriada',
          description: 'Descubra a arte de criticar com elegância na tradição iraniana',
          keywords: 'insulto persa, crítica poética, Hafez, Amazon, Kindle',
        },
      },
      en: {
        title: 'The Art of the Persian Insult',
        series: 'The Art of Insults series',
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0H8BJQHXB',
        blurb: 'Metaphors sharp as verses of Hafez: humiliate with aesthetics.',
      },
    },
  },
  {
    id: 'patadas-arabes',
    cover: '/cover-patadas-arabes.png',
    coverEn: '/cover-patadas-arabes-en.png',
    editions: {
      pt: {
        title: 'Patadas Árabes',
        subtitle: 'A Arte da Retórica do Desprezo',
        series: 'Parte de: A Arte da Patada (4 livros)',
        price: 'R$ 9,99',
        kindleUnlimited: true,
        asin: 'B0FGWVCZB7',
        blurb: 'A retórica do desprezo: maldições de salão e provérbios de desclassificação.',
        description:
          'Explore como o descontentamento é expressado com inteligência linguística e estética no mundo árabe.',
        seo: {
          title: 'Patadas Árabes | Clara Malcriada',
          description: 'A arte da retórica do desprezo no mundo árabe',
          keywords: 'patadas árabes, retórica do desprezo, provérbios árabes, Amazon',
        },
      },
      en: {
        title: 'Arabic Insults: The Art of the Rhetoric of Contempt',
        series: 'The Art of Insults series',
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0H89QKQG5',
        blurb: 'The rhetoric of contempt: parlor curses and disqualifying proverbs.',
      },
    },
  },
  {
    id: 'patadas-russas',
    cover: '/cover-patadas-russas.png',
    coverEn: '/cover-patadas-russas-en.png',
    editions: {
      pt: {
        title: 'Patadas Russas',
        subtitle: 'Como Insultar com Elegância e Sobreviver na Terra dos Czares',
        series: 'Parte de: A Arte da Patada (4 livros)',
        price: 'R$ 9,99',
        kindleUnlimited: true,
        asin: 'B0FG481J85',
        blurb: 'Densidade verbal de czares a memes: ofenda com contexto histórico.',
        description:
          "Desvende a complexidade da comunicação russa com 'PATADAS RUSSAS'. Deixe-se guiar por Clara Malcriada em uma jornada que explora a arte de insultar com elegância.",
        seo: {
          title: 'Patadas Russas | Clara Malcriada',
          description: 'Como insultar com elegância na tradição russa',
          keywords: 'patadas russas, comunicação russa, Pushkin, Putin, Amazon',
        },
      },
      en: {
        title: 'Russian Insults - How to Insult with Elegance and Survive in the Land of the Tsars',
        series: 'The Art of Insults series',
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0H8FSTTFK',
        blurb: 'Verbal density from the tsars to memes: insult with historical context.',
      },
    },
  },
  {
    id: 'a-arte-da-indireta-chinesa',
    cover: '/cover-a-arte-da-indireta-chinesa.png',
    coverEn: '/cover-a-arte-da-indireta-chinesa-en.png',
    editions: {
      pt: {
        title: 'A Arte da Indireta Chinesa',
        subtitle: 'Como Ofender com Elegância e Sabedoria Milenar',
        series: 'Parte de: A Arte da Patada (4 livros)',
        originalPrice: 'R$ 9,99',
        price: 'R$ 5,99',
        kindleUnlimited: true,
        asin: 'B0FFNDMV3Y',
        blurb: 'O silêncio como arma: a tradição de ofender sem abrir a boca.',
        description:
          'Cansado de confrontos diretos? Quer dominar a arte de expressar verdades incômodas com a elegância de um estrategista milenar?',
        seo: {
          title: 'A Arte da Indireta Chinesa | Clara Malcriada',
          description: 'Como ofender com elegância segundo a sabedoria chinesa',
          keywords: 'indireta chinesa, ofender com elegância, Qianlong, TikTok, Amazon',
        },
      },
      en: {
        title: 'The Art of the Chinese Indirection',
        series: 'The Art of Insults series',
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0H8FWGMWJ',
        blurb: 'How to offend with elegance and thousand-year-old wisdom.',
      },
    },
  },
  {
    id: 'patadas-infantis',
    cover: '/cover-patadas-infantis.png',
    coverEn: '/cover-patadas-infantis-en.png',
    editions: {
      pt: {
        title: 'As Melhores Patadas Infantis',
        subtitle: 'Para Adultos!',
        series: 'eBook Kindle',
        originalPrice: 'R$ 9,99',
        price: 'R$ 5,99',
        kindleUnlimited: true,
        asin: 'B0FF3CT1TW',
        blurb: 'Tão ridículas que chegam a ser geniais.',
        description:
          "Prepare-se para o livro mais inútil e hilário que você já leu! Uma coleção de 'patadas' tão ridículas que chegam a ser geniais.",
        seo: {
          title: 'As Melhores Patadas Infantis | Clara Malcriada',
          description: 'O livro mais inútil e hilário sobre patadas infantis para adultos',
          keywords: 'patadas infantis, sarcasmo infantil, Amazon, Kindle',
        },
      },
      en: {
        title: 'The Best Childish Comebacks (For Adults!)',
        series: null,
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0FFFWQ4WC',
        blurb: 'Comebacks so ridiculous they become brilliant — for adults.',
      },
    },
  },
  {
    id: 'patadas-indianas',
    cover: '/cover-patadas-indianas.png',
    coverEn: '/cover-patadas-indianas-en.png',
    editions: {
      pt: {
        title: 'Patadas Indianas',
        subtitle: 'A Arte do Insulto Elegante na Cultura e Retórica da Índia Moderna',
        series: 'eBook Kindle',
        price: 'R$ 9,99',
        kindleUnlimited: true,
        asin: 'B0FK32S89L',
        blurb: 'Dos Vedas aos memes em Hinglish: crítica transformada em arte.',
        description:
          'Descubra Patadas Indianas — um guia irreverente e inteligente sobre a arte do insulto elegante na cultura indiana moderna. Da sabedoria Védica aos memes em Hinglish, da sátira pós-colonial à ironia cotidiana, este livro explora como a retórica oriental transforma crítica em arte.',
        seo: {
          title: 'Patadas Indianas | Clara Malcriada',
          description: 'A Arte do Insulto Elegante na Cultura e Retórica da Índia Moderna',
          keywords: 'patadas indianas, sarcasmo, Amazon, Kindle',
        },
      },
      en: {
        title: 'Indian Insults',
        series: 'The Art of Insults series',
        price: '$2.99',
        kindleUnlimited: true,
        asin: 'B0H8G1PTC6',
        blurb: 'From the Vedas to Hinglish memes: criticism turned into art.',
      },
    },
  },
];

export const SERIES = {
  pt: {
    title: 'A Arte da Patada (6 livros)',
    asin: 'B0FGWYZ3VB',
    url: 'https://www.amazon.com.br/dp/B0FGWYZ3VB',
    blurb:
      'Cinco culturas, uma disciplina: a arte de insultar com elegância. A série completa em uma única página.',
  },
  en: {
    title: 'The Art of Insults (6 books)',
    asin: 'B0H8G573PZ',
    url: 'https://www.amazon.com/dp/B0H8G573PZ',
    blurb:
      'Five cultures, one discipline: the art of insulting with elegance. The complete series on one page — Chinese indirection, Russian insults, Arabic contempt, Persian aesthetics, Indian rhetoric, plus the childish comebacks.',
  },
};

export const editionOf = (book, lang) => book.editions[lang];
