import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEnvelope, FaAmazon, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeBook, setActiveBook] = useState(null);
  
  const books = [
    {
      id: 1,
      name: "a-arte-do-insulto-persa",
      title: "A Arte do Insulto Persa",
      subtitle: "Elegância, Metáforas e Crítica na Tradição Iraniana",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: "./cover-a-arte-do-insulto-persa.png",
      kindleUnlimited: true,
      description: "Combinando erudição e irreverência, Clara Malcriada conduz o leitor por um jardim de espinhos poéticos onde o insulto é refinado como um verso de Hafez.",
      amazonLink: "https://www.amazon.com.br/dp/B0FGNWW71K ",
      seo: {
        title: "A Arte do Insulto Persa | Clara Malcriada",
        description: "Descubra a arte de criticar com elegância na tradição iraniana",
        keywords: "insulto persa, crítica poética, Hafez, Amazon, Kindle"
      }
    },
    {
      id: 2,
      name: "patadas-arabes",
      title: "Patadas Árabes",
      subtitle: "A Arte da Retórica do Desprezo",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: "./cover-patadas-arabes.png",
      kindleUnlimited: true,
      description: "Explore como o descontentamento é expressado com inteligência linguística e estética no mundo árabe.",
      amazonLink: "https://www.amazon.com.br/dp/B0FGWVCZB7 ",
      seo: {
        title: "Patadas Árabes | Clara Malcriada",
        description: "A arte da retórica do desprezo no mundo árabe",
        keywords: "patadas árabes, retórica do desprezo, provérbios árabes, Amazon"
      }
    },
    {
      id: 3,
      name: "patadas-russas",
      title: "Patadas Russas",
      subtitle: "Como Insultar com Elegância e Sobreviver na Terra dos Czares",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: "./cover-patadas-russas.png",
      kindleUnlimited: true,
      description: "Desvende a complexidade da comunicação russa com 'PATADAS RUSSAS'. Deixe-se guiar por Clara Malcriada em uma jornada que explora a arte de insultar com elegância.",
      amazonLink: "https://www.amazon.com.br/dp/B0FG481J85 ",
      seo: {
        title: "Patadas Russas | Clara Malcriada",
        description: "Como insultar com elegância na tradição russa",
        keywords: "patadas russas, comunicação russa, Pushkin, Putin, Amazon"
      }
    },
    {
      id: 4,
      name: "a-arte-da-indireta-chinesa",
      title: "A Arte da Indireta Chinesa",
      subtitle: "Como Ofender com Elegância e Sabedoria Milenar",
      series: "Parte de: A Arte da Patada (4 livros)",
      originalPrice: "R$ 9,99",
      price: "R$ 5,99",
      image: "./cover-a-arte-da-indireta-chinesa.png",
      kindleUnlimited: true,
      description: "Cansado de confrontos diretos? Quer dominar a arte de expressar verdades incômodas com a elegância de um estrategista milenar?",
      amazonLink: "https://www.amazon.com.br/dp/B0FFNDMV3Y ",
      seo: {
        title: "A Arte da Indireta Chinesa | Clara Malcriada",
        description: "Como ofender com elegância segundo a sabedoria chinesa",
        keywords: "indireta chinesa, ofender com elegância, Qianlong, TikTok, Amazon"
      }
    },
    {
      id: 5,
      name: "patadas-infantis",
      title: "As Melhores Patadas Infantis",
      subtitle: "Para Adultos!",
      series: "eBook Kindle",
      originalPrice: "R$ 9,99",
      price: "R$ 5,99",
      image: "./cover-patadas-infantis.png",
      kindleUnlimited: true,
      description: "Prepare-se para o livro mais inútil e hilário que você já leu! Uma coleção de 'patadas' tão ridículas que chegam a ser geniais.",
      amazonLink: "https://www.amazon.com.br/dp/B0FF3CT1TW ",
      seo: {
        title: "As Melhores Patadas Infantis | Clara Malcriada",
        description: "O livro mais inútil e hilário sobre patadas infantis para adultos",
        keywords: "patadas infantis, sarcasmo infantil, Amazon, Kindle"
      }
    }
  ];

  const selectedBook = activeBook ? books.find(b => b.id === activeBook) : null;
  const seoData = selectedBook ? selectedBook.seo : {
    title: "Clara Malcriada | Livros Sarcásticos e Patadas Verbais",
    description: "Clara Malcriada escreve livros sobre sarcasmo, ironia e patadas verbais. Disponíveis na Amazon em formato Kindle.",
    keywords: "Clara Malcriada, livro de sarcasmo, Amazon, Kindle",
    url: `https://claramalcriada.github.io/#patadas-arabes}`,
    image: `https://claramalcriada.github.io/cover-patadas-arabes.png`
  };

  seoData.url = `https://claramalcriada.github.io/#${selectedBook ? selectedBook.name : ''}`;
  seoData.image = `https://claramalcriada.github.io/cover-${selectedBook ? selectedBook.name : ''}.png`

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:type" content={selectedBook ? "book" : "website"} />
        <link rel="canonical" href={seoData.url} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-pink-600">Clara Malcriada</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors">Sobre</a>
              <a href="#books" className="text-gray-700 hover:text-pink-600 transition-colors">Livros</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contato</a>
            </nav>
            <button className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Clara Malcriada <span className="text-pink-600">Não é Obrigada</span>
                </h1>
                <p className="text-xl text-gray-700">
                  Especialista em sarcasmo e criadora de patadas verbais que deixam qualquer um sem reação.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#books" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                    Ver Livros
                  </a>
                  <a href="#about" className="border border-pink-600 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                    Sobre Mim
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200 rounded-full opacity-30"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
                <img 
                  src="./hero.png"
                  alt="Clara Malcriada" 
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quem é Clara Malcriada?</h2>
              <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Clara Malcriada nasceu em algum lugar entre uma bronca mal dada e uma resposta atravessada. Desde pequena demonstrou vocação para dizer o que pensa, especialmente quando não é perguntada. Aos 7 anos, respondeu "não sou obrigada" pela primeira vez — e nunca mais parou.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Formada em Artes do Sarcasmo Aplicado, com especialização em Comunicação Passivo-Agressiva, Clara construiu sua carreira transformando situações cotidianas em armas verbais de destruição (emocional) moderada. Ganhou notoriedade ao ser expulsa de três grupos de WhatsApp da família — com honra e zero arrependimentos.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Especialidades</h3>
                <p className="text-gray-700">
                  Transformar situações cotidianas em armas verbais de destruição (emocional) moderada.
                </p>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Notoriedade</h3>
                <p className="text-gray-700">
                  Famosa por ter sido expulsa de três grupos de WhatsApp da família — com honra e zero arrependimentos.
                </p>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 18.477 14.754 18 16.5 18c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Características</h3>
                <p className="text-gray-700">
                  Recusa convites com elegância, dá conselhos não solicitados e responde e-mails com "conforme solicitado" mesmo quando ninguém solicitou nada.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="books" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Livros da Autora</h2>
              <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700">
                Descubra as obras que transformaram Clara Malcriada na voz que todos temem e amam.
              </p>
            </div>
            
    {/*
            <div className="mb-10 flex justify-center">
              <div className="inline-flex bg-pink-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-pink-600 text-white' : 'text-pink-700'}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setActiveTab('series')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'series' ? 'bg-pink-600 text-white' : 'text-pink-700'}`}
                >
                  Série "A Arte da Patada"
                </button>
                <button 
                  onClick={() => setActiveTab('standalone')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'standalone' ? 'bg-pink-600 text-white' : 'text-pink-700'}`}
                >
                  Livros Avulsos
                </button>
              </div>
            </div>
            */}
            
            <div className="grid md:grid-cols-2 gap-12">
              {books.map((book) => (
                <div 
                  id={book.name}
                  key={book.id}
                  onClick={() => setActiveBook(book.id)}
                  className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full md:w-80 h-auto aspect-[2/3] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    loading="lazy"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{book.subtitle}</p>
                      <p className="text-xs text-gray-500 mb-4">{book.series}</p>
                      <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between">
                      <div className="flex justify-between items-center">
                        <div>
                          {book.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">{book.originalPrice}</p>
                          )}
                          <span className="text-lg font-semibold text-pink-600">{book.price}</span>
                        </div>
                        {book.kindleUnlimited && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
                            Kindle Unlimited
                          </span>
                        )}
                      </div>
                      <a 
                        href={book.amazonLink}
                        className="text-pink-600 hover:text-pink-800 font-medium mt-2 md:mt-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Comprar no Amazon →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Receba as melhores patadas direto na sua caixa de entrada</h2>
              <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 mb-8">
                Inscreva-se para receber frases de efeito, patadas mentais e outras coisas que você não pediu mas vai adorar.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Seu email" 
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-64"
                />
                <button 
                  type="submit" 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vai dizer alguma coisa?</h2>
              <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700">
                Se você insiste em falar comigo, aqui estão os canais oficiais:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-pink-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                <a 
                  href="mailto:malcriadaclara@gmail.com" 
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  malcriadaclara@gmail.com
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAmazon className="text-pink-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Amazon</h3>
                <a 
                  href="https://www.amazon.com.br/author/claramalcriada " 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  @claramalcriada
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaInstagram className="text-pink-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Instagram</h3>
                <a 
                  href="https://instagram.com/malcriadabooks " 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  @malcriadabooks
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaTwitter className="text-pink-600" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">X (Twitter)</h3>
                <a 
                  href="https://x.com/ClaraMalcriada " 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors text-sm"
                >
                  @ClaraMalcriada
                </a>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaYoutube className="text-pink-600" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">YouTube</h3>
                <a 
                  href="https://www.youtube.com/@ClaraMalcriada" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors text-sm"
                >
                  @ClaraMalcriada
                </a>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TbBrandThreads className="text-pink-600" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Threads</h3>
                <a 
                  href="https://www.threads.com/@malcriadabooks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors text-sm"
                >
                  @malcriadabooks
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-600">
                  © 2025 Clara Malcriada. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
