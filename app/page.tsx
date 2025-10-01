"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Función de login
  const handleLogin = (emailValue) => {
    setUserEmail(emailValue);
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('member_email', emailValue);
    }
  };

  // Función de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('member_email');
    }
  };

  // Verificar localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('member_email');
      if (savedEmail) {
        setUserEmail(savedEmail);
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, introduce tu correo electrónico');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      handleLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  // Si no está conectado, mostrar pantalla de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Foto del Producto */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-red-500 shadow-2xl">
              <img
                src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                alt="Protocolo de Dominancia Emocional"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-red-500 mb-2 uppercase tracking-tight">
              Área de Socios
            </h1>
          </div>

          {/* Formulario de Login */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">🔐 Acceso Exclusivo</h2>
              <p className="text-gray-400 text-sm">Introduce tu correo electrónico para acceder a tu contenido</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico de acceso
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verificando acceso...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Acceder a mi área
                    <span className="ml-2">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                🔒 Acceso seguro y cifrado
              </p>
            </div>
          </div>

          {/* Información de soporte */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">¿Problemas de acceso?</p>
            <a 
              href="mailto:sflourcraft@gmail.com"
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300"
            >
              sflourcraft@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Si está conectado, mostrar área de socios
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Cabecera del Área de Socios */}
        <div className="relative max-w-5xl mx-auto p-6 md:p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/30"></div>
          <div className="absolute inset-2 border border-red-500/20 rounded-xl pointer-events-none"></div>
          
          {/* Botón de logout */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-300 z-10"
            title="Cerrar sesión"
          >
            <span className="text-xl">⚙️</span>
          </button>
          
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
              Área de Socios
            </h1>
            <p className="text-lg md:text-2xl text-white font-light mb-6">M.MDR</p>
            
            <div className="bg-white/5 p-4 md:p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-red-400 font-bold text-base md:text-xl mb-3">
                🎯 ¡Bienvenido {userEmail ? userEmail.split('@')[0] : 'Usuario'}!
              </h3>
              <p className="text-white leading-relaxed text-sm md:text-base">
                Ahora tenéis acceso al sistema más avanzado de reconquista y dominancia emocional jamás desarrollado. 
                Haced clic en las imágenes de abajo para acceder a vuestros cursos completos.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta del Plan A */}
        <div className="mb-12">
          <a 
            href="https://comprarplanseguro.shop/plan-a/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                    alt="M.MDR: Reconquista en 21 Días"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                    M.MDR: Reconquista en 21 Días
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    La guía definitiva para la transformación personal y reconquista sostenible. Un sistema completo basado en neuroplasticidad cerebral, psicología conductual e inteligencia emocional.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>10 Módulos de transformación completa</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Diagnóstico profundo de la ruptura</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Protocolo de emergencia de 72 horas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>7 Pilares avanzados de reconquista</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Cronograma detallado de 21 días</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Casos de estudio reales y plantillas probadas</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al M.MDR Completo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta 15 Maneras */}
        <div className="mb-12">
          <a 
            href="https://comprarplanseguro.shop/15-maneras/"
            className="block relative group"
          >
            <div className="relative bg-gradient-to-br from-gray-800 to-yellow-900/10 border-2 border-yellow-500/30 rounded-3xl p-6 md:p-10 transition-all duration-500 overflow-hidden cursor-pointer hover:border-yellow-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide animate-pulse z-20">
                🎁 EXCLUSIVO
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-12T001538.498.png"
                    alt="15 Maneras Irresistibles"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-yellow-500 mb-4 leading-tight">
                    15 Maneras Irresistibles de Iniciar Conversaciones en WhatsApp
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    Una guía definitiva para la comunicación digital eficaz. Material desarrollado tras años de investigación en psicología del comportamiento.
                  </p>
                  
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder a las 15 Maneras
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta Protocolo */}
        <div className="mb-12">
          <a 
            href="https://comprarplanseguro.shop/protocolo/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T090923.835.png"
                    alt="Protocolo de Dominancia Emocional"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                    Protocolo de Dominancia Emocional
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    La ciencia definitiva de la reconquista. Un sistema completo basado en neurociencia emocional, psicología femenina y dinámicas de atracción profunda.
                  </p>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Protocolo Completo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta Sistema de Blindaje */}
        <div className="mb-12">
          <a 
            href="https://comprarplanseguro.shop/blindaje/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-10T233008.344.png"
                    alt="Sistema de Blindaje"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                    Sistema de Blindaje
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    El sistema definitivo para blindar vuestra relación contra cualquier amenaza externa. Una metodología avanzada que garantiza que su obsesión por vosotros crezca con el tiempo.
                  </p>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Sistema de Blindaje
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Sección de Soporte */}
        <div className="bg-white/5 p-6 md:p-8 rounded-2xl text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-red-400 text-xl md:text-2xl font-bold mb-4">💬 ¿Necesitáis Ayuda?</h3>
          <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
            Nuestro equipo de soporte está disponible para aclarar dudas y asistiros en vuestro viaje de transformación.
          </p>
          <a 
            href="mailto:sflourcraft@gmail.com"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 text-sm md:text-base"
          >
            sflourcraft@gmail.com
          </a>
        </div>

        {/* Pie de página */}
        <div className="text-center py-8 md:py-12 border-t border-red-500/30 text-gray-400">
          <p className="mb-2 text-sm md:text-base">© 2025 Protocolo de Dominancia Emocional. Todos los derechos reservados.</p>
          <p className="font-semibold text-sm md:text-base">Vuestra transformación comienza ahora.</p>
        </div>
      </div>
    </div>
  );
}