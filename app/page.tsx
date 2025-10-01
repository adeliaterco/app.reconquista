"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Script from "next/script"
import Image from "next/image"

// GA otimizado com debounce (mantido)
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, props);
        });
        queue = [];
      }
    }, 300);
  };
})();

// Hook para Intersection Observer com fallback (mantido)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs para lazy loading
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });

  // ✅ CTA HANDLER MANTIDO
  const handleCTA = useCallback((e, origem) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    console.log(`🎯 CTA clicado - Origem: ${origem}`);
    
    // Tracking mantido da estrutura original
    enviarEvento('cta_click', { origem, timestamp: Date.now() });
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Reset para UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  return (
    <>
      {/* Scripts de tracking mantidos */}
      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          window.pixelId = "68d352fa2bbdabf114779dac";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
      </Script>

      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="lazyOnload"
      />

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          
          {/* Header da Área de Membros */}
          <div className="relative max-w-5xl mx-auto p-8 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/30"></div>
            <div className="absolute inset-2 border border-red-500/20 rounded-xl pointer-events-none"></div>
            
            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
                Área de Miembros
              </h1>
              <p className="text-xl md:text-2xl text-white font-light mb-6">Plan A</p>
              
              <div className="bg-white/5 p-6 rounded-xl border-l-4 border-red-500">
                <h3 className="text-red-400 font-bold text-lg md:text-xl mb-3">🎯 ¡Bienvenido a tu jornada de transformación!</h3>
                <p className="text-white leading-relaxed text-sm md:text-base">
                  Ahora tienes acceso al sistema más avanzado de reconquista y dominancia emocional jamás desarrollado. 
                  Haz clic en las imágenes de abajo para acceder a tus cursos completos.
                </p>
              </div>
            </div>
          </div>
          
          {/* Card do Plan A - DESBLOQUEADO */}
          <div className="mb-12">
            <a 
              href="https://comprarplanseguro.shop/plan-a/"
              className="block relative group"
            >
              <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  {/* Imagem do curso */}
                  <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                      alt="Plan A: Reconquista en 21 Días"
                      width={200}
                      height={280}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações do curso */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                      Plan A: Reconquista en 21 Días
                    </h2>
                    
                    <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                      La guía definitiva para la transformación personal y reconquista sostenible. Un sistema completo basado en neuroplasticidad cerebral, psicología conductual e inteligencia emocional que te convertirá en una versión completamente renovada de ti mismo.
                    </p>
                    
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {[
                        "10 Módulos de transformación completa",
                        "Diagnóstico profundo de la ruptura", 
                        "Protocolo de emergencia de 72 horas",
                        "7 Pilares avanzados de reconquista",
                        "Cronograma detallado de 21 días",
                        "Casos de estudio reales y plantillas probadas"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center text-white text-sm md:text-base">
                          <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                      Acceder al Plan A Completo
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Cards Bloqueados */}
          {[
            {
              title: "15 Maneras Irresistibles de Iniciar Conversaciones en WhatsApp",
              description: "¡Desbloquea las 15 técnicas más poderosas para iniciar conversaciones irresistibles en WhatsApp! Basado en años de investigación y miles de interacciones reales exitosas.",
              image: "https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-12T001538.498.png",
              href: "https://pay.hotmart.com/L100337728M?off=uo2v2p2i",
              buttonText: "Desbloquear 15 Maneras",
              buttonColor: "orange"
            },
            {
              title: "Protocolo de Dominancia Emocional", 
              description: "¡Desbloquea la ciencia definitiva de la reconquista! Sistema completo con 7 disparadores de obsesión femenina y 21 frases de dominancia emocional que han transformado más de 3,800 vidas.",
              image: "https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T090923.835.png",
              href: "https://pay.hotmart.com/D100233207O?off=hgjszxx1",
              buttonText: "Desbloquear Protocolo",
              buttonColor: "blue"
            },
            {
              title: "Sistema de Blindaje",
              description: "¡Desbloquea el sistema más avanzado para blindar tu relación para toda la vida! Garantiza que su obsesión por ti crezca con el tiempo y crea inmunidad total contra otros hombres.",
              image: "https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-10T233008.344.png", 
              href: "https://pay.hotmart.com/N100448107A?off=rta5i9vg",
              buttonText: "Desbloquear Ahora",
              buttonColor: "green"
            }
          ].map((course, index) => (
            <div key={index} className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent overflow-hidden mb-12">
              
              {/* Badge bloqueado */}
              <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide animate-pulse z-20">
                🎁 PREMIUM
              </div>

              {/* Conteúdo borrado */}
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 filter blur-sm opacity-30">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={200}
                    height={280}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                    {course.title}
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide">
                    Acceder al Curso Completo
                  </button>
                </div>
              </div>

              {/* Overlay de desbloqueio */}
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 rounded-3xl text-center p-6 md:p-10">
                <div className="text-4xl md:text-6xl text-red-500 mb-4 md:mb-6 animate-pulse">
                  🔒
                </div>
                
                <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  {course.title}
                </h3>
                
                <p className="text-white text-sm md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">
                  {course.description}
                </p>
                
                <a 
                  href={course.href}
                  className={`
                    inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide
                    text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                    ${course.buttonColor === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 hover:shadow-blue-500/30' :
                      course.buttonColor === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 hover:shadow-orange-500/30' :
                      'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 hover:shadow-green-500/30'}
                  `}
                >
                  {course.buttonText}
                  <span>🔓</span>
                </a>
              </div>
            </div>
          ))}

          {/* Seção de Suporte */}
          <div className="bg-white/5 p-6 md:p-8 rounded-2xl text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-red-400 text-xl md:text-2xl font-bold mb-4">💬 ¿Necesitas Ayuda?</h3>
            <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
              Nuestro equipo de soporte está disponible para aclarar dudas y asistirte en tu jornada de transformación.
            </p>
            <a 
              href="mailto:soporte.plan.a@gmail.com"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 text-sm md:text-base"
            >
              soporte.plan.a@gmail.com
            </a>
          </div>

          {/* Footer */}
          <div className="text-center py-8 md:py-12 border-t border-red-500/30 text-gray-400">
            <p className="mb-2 text-sm md:text-base">© 2025 Protocolo de Dominancia Emocional. Todos los derechos reservados.</p>
            <p className="font-semibold text-sm md:text-base">Tu transformación comienza ahora.</p>
          </div>
        </div>
      </main>
    </>
  )
}