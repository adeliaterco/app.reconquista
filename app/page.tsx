"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Clock, Users, DollarSign, Star, CheckCircle, Shield, Play, Zap, TrendingUp, Award, Heart, Eye, AlertTriangle, X, Lock, Unlock } from "lucide-react"
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

// Componente Header da Área de Membros
const MembersHeader = () => {
  return (
    <div className="relative max-w-5xl mx-auto p-8 mb-12">
      {/* Fundo com gradiente e bordas */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/30"></div>
      <div className="absolute inset-2 border border-red-500/20 rounded-xl pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
          Área de Miembros
        </h1>
        <p className="text-2xl text-white font-light mb-6">Plan A</p>
        
        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-red-400 font-bold text-xl mb-3">🎯 ¡Bienvenido a tu jornada de transformación!</h3>
          <p className="text-white leading-relaxed">
            Ahora tienes acceso al sistema más avanzado de reconquista y dominancia emocional jamás desarrollado. 
            Haz clic en las imágenes de abajo para acceder a tus cursos completos.
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente Card de Curso Desbloqueado
const CourseCard = ({ 
  title, 
  description, 
  features, 
  image, 
  href, 
  isBonus = false,
  buttonText = "Acceder al Curso"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      className="block relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative bg-gray-800 rounded-3xl p-10 border-2 border-transparent
        transition-all duration-500 overflow-hidden cursor-pointer
        hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20
        ${isBonus ? 'bg-gradient-to-br from-gray-800 to-yellow-900/10 border-yellow-500/30' : ''}
      `}>
        
        {/* Efeito de brilho animado */}
        <div className={`
          absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500
          bg-gradient-to-r from-transparent via-red-500/10 to-transparent
          ${isHovered ? 'opacity-100' : ''}
        `} style={{
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.5s ease, opacity 0.5s ease'
        }}></div>

        {/* Badge de bônus */}
        {isBonus && (
          <div className="absolute top-5 right-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse">
            🎁 BONUS
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Imagem do curso */}
          <div className={`
            flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden border-2 transition-transform duration-300
            ${isBonus ? 'border-yellow-500' : 'border-red-500'}
            ${isHovered ? 'scale-105' : ''}
          `}>
            <Image
              src={image}
              alt={title}
              width={200}
              height={280}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informações do curso */}
          <div className="flex-1 text-center md:text-left">
            <h2 className={`
              text-3xl md:text-4xl font-bold mb-4 leading-tight
              ${isBonus ? 'text-yellow-500' : 'text-red-500'}
            `}>
              {title}
            </h2>
            
            <p className="text-white text-lg mb-6 leading-relaxed">
              {description}
            </p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${isBonus ? 'text-yellow-500' : 'text-red-500'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className={`
              px-8 py-4 rounded-full text-lg font-semibold uppercase tracking-wide
              transition-all duration-300 flex items-center gap-3
              ${isBonus 
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30' 
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30'
              }
              hover:-translate-y-1
            `}>
              {buttonText}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </a>
  );
};

// Componente Card de Curso Bloqueado
const LockedCourseCard = ({ 
  title, 
  description, 
  features, 
  image, 
  unlockHref, 
  unlockButtonText = "Desbloquear Ahora",
  unlockButtonColor = "green",
  badgeText = "🎁 PREMIUM"
}) => {
  const getButtonClasses = () => {
    switch (unlockButtonColor) {
      case 'blue':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 hover:shadow-blue-500/30';
      case 'orange':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 hover:shadow-orange-500/30';
      default:
        return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 hover:shadow-green-500/30';
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-3xl p-10 border-2 border-transparent overflow-hidden">
      
      {/* Badge bloqueado */}
      <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse z-20">
        {badgeText}
      </div>

      {/* Conteúdo borrado */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 filter blur-sm opacity-30">
        <div className="flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden border-2 border-red-500">
          <Image
            src={image}
            alt={title}
            width={200}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
            {title}
          </h2>
          
          <p className="text-white text-lg mb-6 leading-relaxed">
            {description}
          </p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold uppercase tracking-wide">
            Acceder al Curso Completo
          </Button>
        </div>
      </div>

      {/* Overlay de desbloqueio */}
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 rounded-3xl text-center p-10">
        <div className="text-6xl text-red-500 mb-6 animate-pulse">
          🔒
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-4">
          {title}
        </h3>
        
        <p className="text-white text-lg mb-8 max-w-md leading-relaxed">
          {description}
        </p>
        
        <a 
          href={unlockHref}
          className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold uppercase tracking-wide
            text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
            ${getButtonClasses()}
          `}
        >
          {unlockButtonText}
          <Unlock className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

// Componente Seção de Suporte
const SupportSection = () => {
  return (
    <div className="bg-white/5 p-8 rounded-2xl text-center max-w-2xl mx-auto">
      <h3 className="text-red-400 text-2xl font-bold mb-4">💬 ¿Necesitas Ayuda?</h3>
      <p className="text-white mb-6 leading-relaxed">
        Nuestro equipo de soporte está disponible para aclarar dudas y asistirte en tu jornada de transformación.
      </p>
      <a 
        href="mailto:soporte.plan.a@gmail.com"
        className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30"
      >
        soporte.plan.a@gmail.com
      </a>
    </div>
  );
};

// Componente Footer
const MembersFooter = () => {
  return (
    <div className="text-center py-12 border-t border-red-500/30 text-gray-400">
      <p className="mb-2">© 2025 Protocolo de Dominancia Emocional. Todos los derechos reservados.</p>
      <p className="font-semibold">Tu transformación comienza ahora.</p>
    </div>
  );
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [vagasRestantes, setVagasRestantes] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [clientesVisualizando, setClientesVisualizando] = useState(127);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [vturbReady, setVturbReady] = useState(false);
  const [novasVagas24h, setNovasVagas24h] = useState(47);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(true);
  
  // Refs para lazy loading
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [priceRef, priceInView] = useIntersectionObserver({ threshold: 0.1 });

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
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      
      {/* Scripts de tracking mantidos */}
      <link rel="preconnect" href="https://cdn.utmify.com.br" />
      <link rel="preconnect" href="https://api6.ipify.org" />
      <link rel="preconnect" href="https://comprarplanseguro.shop" />

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

      <div className="container mx-auto px-4 py-8">
        
        {/* Header da Área de Membros */}
        <MembersHeader />
        
        {/* Card do Plan A - DESBLOQUEADO */}
        <div className="mb-12">
          <CourseCard 
            title="Plan A: Reconquista en 21 Días"
            description="La guía definitiva para la transformación personal y reconquista sostenible. Un sistema completo basado en neuroplasticidad cerebral, psicología conductual e inteligencia emocional que te convertirá en una versión completamente renovada de ti mismo."
            features={[
              "10 Módulos de transformación completa",
              "Diagnóstico profundo de la ruptura", 
              "Protocolo de emergencia de 72 horas",
              "7 Pilares avanzados de reconquista",
              "Cronograma detallado de 21 días",
              "Casos de estudio reales y plantillas probadas"
            ]}
            image="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
            href="https://comprarplanseguro.shop/plan-a/"
            buttonText="Acceder al Plan A Completo"
          />
        </div>

        {/* Card 15 Maneiras - BLOQUEADO */}
        <div className="mb-12">
          <LockedCourseCard 
            title="15 Maneras Irresistibles de Iniciar Conversaciones en WhatsApp"
            description="¡Desbloquea las 15 técnicas más poderosas para iniciar conversaciones irresistibles en WhatsApp! Basado en años de investigación y miles de interacciones reales exitosas."
            features={[
              "15 técnicas probadas para iniciar conversaciones",
              "Basado en psicología del comportamiento",
              "Análisis de patrones de comunicación digital", 
              "Estrategias que generan respuestas inmediatas",
              "Métodos testados con miles de interacciones",
              "Guía práctica para comunicación eficaz"
            ]}
            image="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-12T001538.498.png"
            unlockHref="https://pay.hotmart.com/L100337728M?off=uo2v2p2i"
            unlockButtonText="Desbloquear 15 Maneras"
            unlockButtonColor="orange"
            badgeText="�� PREMIUM"
          />
        </div>

        {/* Card Protocolo - BLOQUEADO */}
        <div className="mb-12">
          <LockedCourseCard 
            title="Protocolo de Dominancia Emocional"
            description="¡Desbloquea la ciencia definitiva de la reconquista! Sistema completo con 7 disparadores de obsesión femenina y 21 frases de dominancia emocional que han transformado más de 3,800 vidas."
            features={[
              "Arquitectura estratégica completa",
              "7 Disparadores de Obsesión Femenina",
              "21 Frases de Dominancia Emocional",
              "Protocolo de Inversión de Dinámica", 
              "Casos reales y estudios detallados",
              "Mensajes de emergencia para situaciones límite"
            ]}
            image="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T090923.835.png"
            unlockHref="https://pay.hotmart.com/D100233207O?off=hgjszxx1"
            unlockButtonText="Desbloquear Protocolo"
            unlockButtonColor="blue"
          />
        </div>

        {/* Card Sistema de Blindaje - BLOQUEADO */}
        <div className="mb-12">
          <LockedCourseCard 
            title="Sistema de Blindaje"
            description="¡Desbloquea el sistema más avanzado para blindar tu relación para toda la vida! Garantiza que su obsesión por ti crezca con el tiempo y crea inmunidad total contra otros hombres."
            features={[
              "Su obsesión por ti CRECE con el tiempo",
              "Inmunidad total contra otros hombres",
              "Relación cada vez más sólida y apasionada",
              "Nunca se aburre de ti (renovación constante)",
              "97% probabilidad de relación permanente", 
              "Ella te ve como "el hombre de su vida"",
              "Relación blindada para toda la vida"
            ]}
            image="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-10T233008.344.png"
            unlockHref="https://pay.hotmart.com/N100448107A?off=rta5i9vg"
            unlockButtonText="Desbloquear Ahora"
            unlockButtonColor="green"
          />
        </div>

        {/* Seção de Suporte */}
        <div className="mb-12">
          <SupportSection />
        </div>

        {/* Footer */}
        <MembersFooter />
      </div>
    </main>
  )
}