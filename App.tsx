import { useState, useEffect } from 'react';
import { Download, Shield, Zap, Star, ChevronRight, Globe, Lock, ChevronLeft } from 'lucide-react';

const APK_URL = 'https://github.com/TuUsuario/NebulaBuild/releases/download/v1.0/nebula-store-v1.0.apk';

const translations = {
  es: {
    nav: { download: 'Descargar' },
    hero: {
      badge: 'Disponible para Android',
      title: 'Nebula: El hub definitivo para los juegos que no encuentras en ningún lado',
      subtitle:
        'Ports exclusivos, juegos indie y clásicos descatalogados. Todo en un solo lugar, sin publicidad, sin restricciones.',
      cta: 'Descargar Nebula Store para Android',
      ctaSub: 'Gratis · APK directo · Sin cuenta requerida',
    },
    stats: {
      games: 'Juegos disponibles',
      rating: 'Valoración media',
      ads: 'Publicidad',
    },
    how: {
      title: 'Cómo funciona',
      subtitle: 'Simple, directo y sin complicaciones.',
      cards: [
        {
          icon: 'star' as const,
          title: 'Curaduría',
          desc: 'Solo los mejores juegos pasan el filtro. Cada título es verificado y seleccionado a mano por nuestro equipo.',
        },
        {
          icon: 'zap' as const,
          title: 'Instalación',
          desc: 'Links directos y verificados. Sin redireccionamientos, sin encuestas, sin esperas absurdas.',
        },
        {
          icon: 'lock' as const,
          title: 'Libertad',
          desc: 'Encuentra lo que la Play Store no te deja ver. Juegos retirados, ports no oficiales y títulos exclusivos.',
        },
      ],
    },
    carousel: {
      title: 'Explora Nebula Store',
      subtitle: 'Mira cómo funciona la app en acción. Interfaz intuitiva, búsqueda rápida y miles de juegos al alcance de tu mano.',
      trust: [
        'Más de 10,000 descargas verificadas',
        'Desarrolladores de confianza',
        'APK 100% seguro y verificado',
      ],
    },
    install: {
      title: 'Instalar en 3 pasos',
      subtitle: 'Sencillo y seguro. Solo toma un minuto.',
      steps: [
        {
          num: '01',
          title: 'Descarga el APK',
          desc: 'Pulsa el botón de descarga. El archivo APK se guardará en tu carpeta de Descargas.',
        },
        {
          num: '02',
          title: 'Permite fuentes desconocidas',
          desc: 'Ve a Ajustes → Seguridad → Instalar apps de fuentes desconocidas y activa la opción.',
        },
        {
          num: '03',
          title: 'Instala y disfruta',
          desc: 'Abre el archivo APK descargado y sigue el asistente de instalación. ¡Listo!',
        },
      ],
    },
    footer: {
      tagline: 'El store que la Play Store no quiere que conozcas.',
      rights: '© 2026 Nebula Store. Todos los derechos reservados.',
    },
    finalCta: {
      title: '¿Listo para explorar?',
      body: 'Descarga Nebula Store y accede a una biblioteca de juegos que la Play Store no puede ofrecerte.',
    },
    safeLabel: 'Seguro y verificado',
  },
  en: {
    nav: { download: 'Download' },
    hero: {
      badge: 'Available for Android',
      title: "Nebula: The ultimate hub for games you won't find anywhere else",
      subtitle:
        'Exclusive ports, indie games and discontinued classics. All in one place, no ads, no restrictions.',
      cta: 'Download Nebula Store for Android',
      ctaSub: 'Free · Direct APK · No account required',
    },
    stats: {
      games: 'Available games',
      rating: 'Average rating',
      ads: 'Ads',
    },
    how: {
      title: 'How it works',
      subtitle: 'Simple, straightforward and hassle-free.',
      cards: [
        {
          icon: 'star' as const,
          title: 'Curation',
          desc: 'Only the best games make the cut. Every title is verified and hand-picked by our team.',
        },
        {
          icon: 'zap' as const,
          title: 'Installation',
          desc: 'Direct and verified links. No redirects, no surveys, no pointless waiting.',
        },
        {
          icon: 'lock' as const,
          title: 'Freedom',
          desc: "Find what the Play Store won't let you see. Removed games, unofficial ports and exclusive titles.",
        },
      ],
    },
    carousel: {
      title: 'Explore Nebula Store',
      subtitle: 'See the app in action. Intuitive interface, fast search, and thousands of games at your fingertips.',
      trust: [
        'Over 10,000 verified downloads',
        'Trusted developers',
        '100% safe and verified APK',
      ],
    },
    install: {
      title: 'Install in 3 steps',
      subtitle: 'Simple and safe. Takes just a minute.',
      steps: [
        {
          num: '01',
          title: 'Download the APK',
          desc: 'Tap the download button. The APK file will be saved to your Downloads folder.',
        },
        {
          num: '02',
          title: 'Allow unknown sources',
          desc: 'Go to Settings → Security → Install apps from unknown sources and enable the option.',
        },
        {
          num: '03',
          title: 'Install and enjoy',
          desc: 'Open the downloaded APK file and follow the installation wizard. Done!',
        },
      ],
    },
    footer: {
      tagline: "The store the Play Store doesn't want you to know about.",
      rights: '© 2026 Nebula Store. All rights reserved.',
    },
    finalCta: {
      title: 'Ready to explore?',
      body: "Download Nebula Store and access a game library the Play Store can't offer you.",
    },
    safeLabel: 'Safe & verified',
  },
};

type Lang = 'es' | 'en';
type IconKey = 'star' | 'zap' | 'lock';

const iconMap: Record<IconKey, React.ElementType> = {
  star: Star,
  zap: Zap,
  lock: Lock,
};

const cardColors = ['#60a5fa', '#22d3ee', '#34d399'];
const cardGradients = [
  'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.04))',
  'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.04))',
  'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.04))',
];

const screenshots = [
  '/screenshots/Screenshot_20260503-233848.png',
  '/screenshots/Screenshot_20260503-235922.png',
  '/screenshots/Screenshot_20260503-235932.png',
  '/screenshots/Screenshot_20260503-235941.png',
];

function NebulaLogo({ size = 40, textSize = 'text-3xl' }: { size?: number; textSize?: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #05050f 0%, #0e0e2a 100%)',
        border: '1.5px solid rgba(110,180,255,0.22)',
        boxShadow: '0 0 24px rgba(59,130,246,0.18)',
        flexShrink: 0,
      }}
    >
      <span
        className={`font-black ${textSize}`}
        style={{
          fontStyle: 'italic',
          background: 'linear-gradient(135deg, #6eb4ff 0%, #818cf8 60%, #c4b5fd 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        N
      </span>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Moving orbs */}
      <div
        className="absolute rounded-full animate-float-slow"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          top: '5%',
          left: '-100px',
        }}
      />
      <div
        className="absolute rounded-full animate-float-slower"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          top: '35%',
          right: '-150px',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute rounded-full animate-float-slow"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
          bottom: '10%',
          left: '5%',
          animationDelay: '4s',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
          opacity: 0.5,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

function ScreenshotCarousel({ lang }: { lang: Lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <section className="px-5 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-black text-2xl sm:text-3xl md:text-4xl mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.carousel.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
            {t.carousel.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-8 rounded-3xl overflow-hidden" style={{ aspectRatio: '9/16', maxWidth: '280px', margin: '0 auto' }}>
          <img
            src={screenshots[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all hover:bg-white/20 z-10"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all hover:bg-white/20 z-10"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <ChevronRight size={20} color="white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="rounded-full transition-all"
                style={{
                  width: currentIndex === i ? 24 : 8,
                  height: 8,
                  background: currentIndex === i ? 'rgba(59,130,246,1)' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.carousel.trust.map((trust, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}
            >
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: 'rgba(52,211,153,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={16} color="#34d399" fill="#34d399" />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {trust}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const t = translations[lang];

  const handleDownload = () => {
    window.location.href = APK_URL;
  };

  return (
    <div
      className="min-h-screen bg-black text-white relative"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <AnimatedBackground />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Nav */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-3">
            <NebulaLogo size={36} textSize="text-xl" />
            <span className="font-bold text-base tracking-tight">Nebula Store</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <Globe size={13} />
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#fff',
              }}
            >
              {t.nav.download}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-24"
          style={{ minHeight: '100vh' }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 animate-fade-in-scale"
            style={{
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#60a5fa',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                boxShadow: '0 0 8px #34d399',
              }}
            />
            {t.hero.badge}
          </div>

          {/* Logo */}
          <div className="mb-8 animate-slide-left">
            <NebulaLogo size={96} textSize="text-5xl" />
          </div>

          {/* Title */}
          <h1
            className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 animate-slide-left"
            style={{ letterSpacing: '-0.025em', lineHeight: '1.08', animationDelay: '0.1s' }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg max-w-md mb-10 animate-slide-right"
            style={{ color: 'rgba(255,255,255,0.48)', lineHeight: '1.65', animationDelay: '0.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA */}
          <div id="download" className="w-full max-w-sm animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-base sm:text-lg transition-all active:scale-95 hover:opacity-92"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                boxShadow: '0 0 48px rgba(59,130,246,0.38)',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              <Download size={22} strokeWidth={2.5} />
              {t.hero.cta}
            </button>
            <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {t.hero.ctaSub}
            </p>
          </div>

          {/* Stats */}
          <div
            className="flex items-center justify-center gap-10 mt-16 pt-8 w-full max-w-xs animate-fade-in-scale"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              animationDelay: '0.4s',
            }}
          >
            {[
              { value: '500+', label: t.stats.games },
              { value: '4.9', label: t.stats.rating },
              { value: '0', label: t.stats.ads },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-black text-xl"
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-5 py-24 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-black text-2xl sm:text-3xl md:text-4xl mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {t.how.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem' }}>{t.how.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.how.cards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <div
                  key={i}
                  className="rounded-3xl p-6 flex flex-col animate-fade-in-scale"
                  style={{
                    background: cardGradients[i],
                    border: '1px solid rgba(255,255,255,0.07)',
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `${cardColors[i]}18`,
                      border: `1px solid ${cardColors[i]}30`,
                    }}
                  >
                    <Icon size={20} color={cardColors[i]} strokeWidth={2.2} />
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ letterSpacing: '-0.01em', color: '#fff' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Screenshot Carousel */}
        <ScreenshotCarousel lang={lang} />

        {/* Installation guide */}
        <section className="px-5 py-24">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-14">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{
                  background: 'rgba(52,211,153,0.09)',
                  border: '1px solid rgba(52,211,153,0.22)',
                  color: '#34d399',
                }}
              >
                <Shield size={12} strokeWidth={2.5} />
                {t.safeLabel}
              </div>
              <h2
                className="font-black text-2xl sm:text-3xl md:text-4xl mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.install.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem' }}>
                {t.install.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {t.install.steps.map((step, i) => (
                <div key={i} className="relative">
                  <div
                    className="flex items-start gap-4 p-5 rounded-2xl animate-fade-in-scale"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs"
                      style={{
                        background: 'rgba(59,130,246,0.09)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: '#60a5fa',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm mb-1" style={{ color: '#fff' }}>
                        {step.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.42)' }}
                      >
                        {step.desc}
                      </p>
                    </div>
                    {i < t.install.steps.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="shrink-0 mt-3"
                        style={{ color: 'rgba(255,255,255,0.12)' }}
                      />
                    )}
                  </div>
                  {i < t.install.steps.length - 1 && (
                    <div
                      className="mx-auto mt-1 mb-0"
                      style={{
                        width: 1,
                        height: 16,
                        background: 'rgba(59,130,246,0.2)',
                        marginLeft: '30px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div
              className="rounded-3xl p-8 sm:p-10 animate-fade-in-scale"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(6,182,212,0.07) 100%)',
                border: '1px solid rgba(59,130,246,0.18)',
              }}
            >
              <div className="flex justify-center mb-6">
                <NebulaLogo size={64} textSize="text-4xl" />
              </div>
              <h2
                className="font-black text-2xl sm:text-3xl mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.finalCta.title}
              </h2>
              <p
                className="text-sm mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                {t.finalCta.body}
              </p>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 hover:opacity-92"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  boxShadow: '0 0 40px rgba(59,130,246,0.32)',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                <Download size={20} strokeWidth={2.5} />
                {t.hero.cta}
              </button>
              <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
                {t.hero.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="px-6 py-10 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <NebulaLogo size={28} textSize="text-sm" />
            <span className="font-bold text-sm">Nebula Store</span>
          </div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {t.footer.tagline}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.16)' }}>
            {t.footer.rights}
          </p>
        </footer>
      </div>
    </div>
  );
}
