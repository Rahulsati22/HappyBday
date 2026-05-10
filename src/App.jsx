import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import kashish1 from './assets/Whatsapp/kashish1.jpeg'
import kashish2 from './assets/Whatsapp/kashish2.jpeg'
import kashish3 from './assets/Whatsapp/kashish3.jpeg'
import kashish4 from './assets/Whatsapp/kashish4.jpeg'
import kashish5 from './assets/Whatsapp/kashish5.jpeg'

/* ──────────── CONSTANTS ──────────── */
const PHOTOS = [
  { src: kashish1, caption: 'My Beautiful Kashish 💖', sub: 'The prettiest smile' },
  { src: kashish2, caption: 'You Light Up My World ✨', sub: 'Every moment is magical' },
  { src: kashish3, caption: 'My Favorite Person 🌸', sub: 'Always & forever' },
  { src: kashish4, caption: 'Pure Sunshine ☀️', sub: 'Radiating happiness' },
  { src: kashish5, caption: 'My Heart 💕', sub: 'You complete me' },
]

const WISHES = [
  { emoji: '🌟', text: 'May your birthday shine as bright as your beautiful smile that lights up my entire world.' },
  { emoji: '🦋', text: 'Wishing you a year full of adventures, laughter, and all the love your heart can hold.' },
  { emoji: '🌈', text: "May every dream you've dreamed come true, and every wish you make be granted." },
  { emoji: '💫', text: "Here's to another year of making beautiful memories together. You deserve the universe." },
  { emoji: '🌺', text: 'May your day be filled with surprises, love, and the warmth of people who adore you.' },
  { emoji: '🎀', text: "You're not just my girlfriend, you're my best friend, my confidant, and my everything." },
]

const TIMELINE = [
  { emoji: '💫', title: 'The Day We Met', text: 'The universe aligned perfectly the day our paths crossed. That moment changed everything.' },
  { emoji: '💝', title: 'First Butterflies', text: 'Every conversation made my heart race. I knew you were someone incredibly special.' },
  { emoji: '🌹', title: 'Falling in Love', text: 'Somewhere between our late-night talks and silly jokes, I fell completely in love with you.' },
  { emoji: '💖', title: 'Today & Forever', text: 'Every day with you is a gift. Happy Birthday to the love of my life!' },
]

const HEART_EMOJIS = ['💖', '💕', '💗', '💓', '💝', '💘', '🩷', '♥️', '❤️‍🔥', '🌸']
const CONFETTI_COLORS = ['#ff6b9d', '#e84393', '#fd79a8', '#f9ca24', '#ffeaa7', '#a29bfe', '#ff9ff3', '#ff6b6b']

/* ──────────── FLOATING HEARTS (background) ──────────── */
function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: Math.random() * 100,
    size: 0.8 + Math.random() * 1.5,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
  }))

  return (
    <div className="floating-hearts">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

/* ──────────── SPARKLES ──────────── */
function Sparkles() {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 3 + Math.random() * 5,
    duration: 1.5 + Math.random() * 3,
    delay: Math.random() * 4,
  }))

  return (
    <div className="sparkle-container">
      {sparkles.map(s => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────── CONFETTI BURST ──────────── */
function Confetti({ active }) {
  if (!active) return null
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 8,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 1.5,
    shape: Math.random() > 0.5 ? '50%' : '2px',
  }))

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.shape,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────── LIGHTBOX ──────────── */
function Lightbox({ src, onClose }) {
  if (!src) return null
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-close" onClick={onClose}>✕</div>
      <img src={src} alt="Kashish" onClick={e => e.stopPropagation()} />
    </div>
  )
}

/* ──────────── SCROLL ANIMATION HOOK ──────────── */
function useScrollAnimation(active) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    /* Small delay to ensure DOM is rendered */
    const timer = setTimeout(() => {
      const el = ref.current
      if (el) {
        const children = el.querySelectorAll('.animate-on-scroll')
        children.forEach(child => observer.observe(child))
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [active])

  return ref
}

/* ──────────── MAIN APP ──────────── */
export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [showSite, setShowSite] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const scrollRef = useScrollAnimation(showSite)

  /* Open envelope handler */
  const openEnvelope = useCallback(() => {
    setEnvelopeOpen(true)
    setTimeout(() => {
      setShowSite(true)
      setConfetti(true)
      setTimeout(() => setConfetti(false), 4000)
    }, 800)
  }, [])

  /* Blow candles */
  const blowCandles = useCallback(() => {
    setCandlesBlown(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 4000)
  }, [])

  /* Final heart click */
  const heartClick = useCallback(() => {
    setClickCount(c => c + 1)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }, [])

  /* ──── ENVELOPE SCREEN ──── */
  if (!showSite) {
    return (
      <>
        <FloatingHearts />
        <div className={`envelope-screen ${envelopeOpen ? 'opened' : ''}`} onClick={openEnvelope}>
          <div className="envelope-container">
            <div className="envelope" />
            <p className="envelope-text">You have a special surprise! 💖</p>
            <p className="envelope-subtext">~ tap to open ~</p>
          </div>
        </div>
      </>
    )
  }

  /* ──── MAIN SITE ──── */
  return (
    <div ref={scrollRef}>
      <FloatingHearts />
      <Sparkles />
      <Confetti active={confetti} />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      {/* ═══ HERO ═══ */}
      <section className="hero-section" id="hero">
        <div className="hero-photo-frame animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <img src={kashish1} alt="Kashish" />
        </div>
        <div className="hero-badge animate-on-scroll">✨ A Special Day ✨</div>
        <h1 className="hero-title animate-on-scroll">
          Happy Birthday
          <span>Kashish!</span>
        </h1>
        <p className="hero-subtitle animate-on-scroll">
          🎂 Today the world celebrates because you were born 🎂
        </p>
        <div className="scroll-indicator">
          <span>Scroll down for your surprise</span>
          <span className="arrow">↓</span>
        </div>
      </section>

      {/* ═══ COUNTDOWN ═══ */}
      <section className="section countdown-section" id="countdown">
        <h2 className="section-title animate-on-scroll">A Year of Love Ahead 💫</h2>
        <p className="section-subtitle animate-on-scroll">365 more days of making beautiful memories together</p>
        <div className="countdown-grid">
          {[
            { num: '365', label: 'Days' },
            { num: '8760', label: 'Hours' },
            { num: '525600', label: 'Minutes' },
            { num: '∞', label: 'Love' },
          ].map((item, i) => (
            <div key={i} className="countdown-card animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="countdown-number">{item.num}</div>
              <div className="countdown-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section className="section gallery-section" id="gallery">
        <h2 className="section-title animate-on-scroll">My Favorite Person 📸</h2>
        <p className="section-subtitle animate-on-scroll">Every photo tells a story of how beautiful you are</p>
        <div className="gallery-grid">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="gallery-card animate-on-scroll"
              style={{ transitionDelay: `${i * 0.12}s` }}
              onClick={() => setLightboxSrc(photo.src)}
            >
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <div className="gallery-overlay">
                <p>{photo.caption}</p>
                <small>{photo.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="section timeline-section" id="story">
        <h2 className="section-title animate-on-scroll">Our Love Story 💕</h2>
        <p className="section-subtitle animate-on-scroll">Every chapter is more beautiful than the last</p>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item animate-on-scroll" style={{ transitionDelay: `${i * 0.2}s` }}>
              <span className="timeline-emoji">{item.emoji}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LOVE LETTER ═══ */}
      <section className="section letter-section" id="letter">
        <h2 className="section-title animate-on-scroll">A Letter for You 💌</h2>
        <p className="section-subtitle animate-on-scroll">From my heart to yours</p>
        <div className="love-letter animate-on-scroll">
          <p className="letter-greeting">My Dearest Kashish,</p>
          <div className="letter-body">
            <p>
              On this special day, I want you to know just how much you mean to me.
              You are the reason I believe in magic, the reason my heart skips a beat
              every time I see your smile. 💖
            </p>
            <p>
              Every moment with you feels like a beautiful dream I never want to wake
              up from. Your laugh is my favorite sound, your eyes hold the stars, and
              your love is the greatest gift I've ever received. ✨
            </p>
            <p>
              You make the ordinary extraordinary, you turn simple moments into
              unforgettable memories. I am so incredibly lucky to have you in my life,
              and I promise to spend every day making you feel as special as you truly are. 🌹
            </p>
            <p>
              Happy Birthday, my love. Today and always, you deserve the whole world
              and more. Here's to many more birthdays together, many more laughs,
              many more adventures, and an infinite amount of love. 🎂💕
            </p>
          </div>
          <p className="letter-signature">Forever Yours, Rahul 💗</p>
        </div>
      </section>

      {/* ═══ WISHES ═══ */}
      <section className="section wishes-section" id="wishes">
        <h2 className="section-title animate-on-scroll">Birthday Wishes 🎁</h2>
        <p className="section-subtitle animate-on-scroll">Each one comes from the bottom of my heart</p>
        <div className="wishes-grid">
          {WISHES.map((wish, i) => (
            <div key={i} className="wish-card animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="wish-emoji">{wish.emoji}</span>
              <p className="wish-text">{wish.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CAKE ═══ */}
      <section className="section cake-section" id="cake">
        <h2 className="section-title animate-on-scroll">Make a Wish! 🎂</h2>
        <p className="section-subtitle animate-on-scroll">Close your eyes, make a wish, and blow the candles</p>
        <div className="animate-on-scroll">
          {!candlesBlown && <div className="candles-lit">🕯️🕯️🕯️🕯️🕯️</div>}
          {candlesBlown && <div className="candles-lit">🎉🎊✨💖🎉</div>}
          {/* <img className="cake-image" src="cake.png" alt="Birthday Cake" /> */}
          {!candlesBlown ? (
            <button className="blow-candle-btn" onClick={blowCandles}>
              🌬️ Blow the Candles!
            </button>
          ) : (
            <p className="hero-subtitle" style={{ marginTop: '15px' }}>
              🎉 Your wish will come true! 🎉
            </p>
          )}
        </div>
      </section>

      {/* ═══ FINAL ═══ */}
      <section className="section final-section" id="final">
        <h1 className="final-title animate-on-scroll">
          Happy Birthday Kashish! 🎂💖
        </h1>
        <p className="final-message animate-on-scroll">
          You are loved more than words can ever express. Thank you for being you —
          the most wonderful, kind, beautiful, and amazing person in this world.
          I love you to the moon and back! 🌙
        </p>
        <div className="final-heart" onClick={heartClick}>
          {clickCount > 0 ? '💗' : '💖'}
        </div>
        {clickCount > 0 && (
          <p className="hero-subtitle" style={{ marginTop: '10px', fontSize: '1rem' }}>
            You've clicked {clickCount} time{clickCount > 1 ? 's' : ''} — that's how many reasons I love you! 💕
          </p>
        )}
        <div className="final-photos animate-on-scroll">
          {PHOTOS.map((p, i) => (
            <div key={i} className="final-photo" onClick={() => setLightboxSrc(p.src)}>
              <img src={p.src} alt="Kashish" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
