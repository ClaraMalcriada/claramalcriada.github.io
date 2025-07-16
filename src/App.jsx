import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data for books
  const books = [
    {
      id: 1,
      title: "A Arte da Indireta Chinesa",
      subtitle: "Como Ofender com Elegância e Sabedoria Milenar",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 5,99",
      image: "https://placehold.co/300x400?text=A+Arte+da+Indireta+Chinesa",
      kindleUnlimited: true,
      featured: true
    },
    {
      id: 2,
      title: "Patadas Russas",
      subtitle: "Como Insultar com Elegância e Sobreviver na Terra dos Czares",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: " https://placehold.co/300x400?text=Patadas+Russas",
      kindleUnlimited: true
    },
    {
      id: 3,
      title: "As Melhores Patadas Infantis",
      subtitle: "Para Adultos!",
      series: "eBook Kindle",
      price: "R$ 5,99",
      image: " https://placehold.co/300x400?text=As+Melhores+Patadas+Infantis",
      kindleUnlimited: true
    },
    {
      id: 4,
      title: "Patadas Árabes",
      subtitle: "A Arte da Retórica do Desprezo",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: " https://placehold.co/300x400?text=Patadas+Árabes",
      kindleUnlimited: true
    },
    {
      id: 5,
      title: "A Arte do Insulto Persa",
      subtitle: "Elegância, Metáforas e Crítica na Tradição Iraniana",
      series: "Parte de: A Arte da Patada (4 livros)",
      price: "R$ 9,99",
      image: " https://placehold.co/300x400?text=A+Arte+do+Insulto+Persa",
      kindleUnlimited: true
    },
    {
      id: 6,
      title: "The Best Childish Comebacks",
      subtitle: "For Adults! (English Edition)",
      series: "eBook Kindle",
      price: "R$ 5,99",
      image: " https://placehold.co/300x400?text=The+Best+Childish+Comebacks",
      kindleUnlimited: true,
      rating: "5.0 de 5 estrelas",
      reviews: "1 avaliação de clientes"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
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
                <a 
                  href="#books" 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Ver Livros
                </a>
                <a 
                  href="#about" 
                  className="border border-pink-600 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Sobre Mim
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200 rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
              <img 
                src=" https://placehold.co/600x600?text=Clara+Malcriada" 
                alt="Clara Malcriada" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Books Section */}
      <section id="books" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meus Livros</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Descubra as obras que transformaram Clara Malcriada na voz que todos temem e amam.
            </p>
          </div>
          
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.subtitle}</p>
                  <p className="text-xs text-gray-500 mb-4">{book.series}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-pink-600">{book.price}</span>
                    <div className="flex items-center">
                      {book.kindleUnlimited && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2">
                          Kindle Unlimited
                        </span>
                      )}
                      {book.rating && (
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600">{book.rating}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <a href="#" className="text-pink-600 hover:text-pink-800 font-medium">
                      Visualização rápida
                    </a>
                    <a href="#" className="text-pink-600 hover:text-pink-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vai dizer alguma coisa?</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Se você insiste em falar comigo, aqui estão os canais oficiais:
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">clara.malcriada@email.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Amazon</h3>
              <p className="text-gray-600">clara.malcriada</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Instagram</h3>
              <p className="text-gray-600">@claramalcriada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-600">
                © 2023 Clara Malcriada. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.74 0 8.333.014 7.053.06 2.05 1.311 1.344 7.824 2.35 12.829c1.279 4.896 5.555 8.121 10.645 7.104 4.896-1.279 8.123-5.556 7.103-10.645C18.788 3.241 15.26 0 12 0zm0 11c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm2.1-7.707-4.2 4.459-2.1-2.1.939-.939 1.161 1.163 3.261-3.46.939.939z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}