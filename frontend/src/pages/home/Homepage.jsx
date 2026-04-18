import React, { useState, useEffect, useRef } from 'react';

// === ICONS ===
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

// === DATA ===
const reelData = [
  {
    id: 1,
    chef: 'SK',
    chefName: "Sanjay's Kitchen",
    handle: '@sanjay.cooks • 84K followers',
    avatarGrad: 'linear-gradient(135deg,#FF8C42,#C34A00)',
    title: 'Midnight Butter\nChicken 🔥',
    tags: ['#NorthIndian', '#MidnightEats', '#DeliciousAF'],
    desc: 'Silky tomato-cream gravy, slow-cooked for 4 hours. The secret? Smoked kashmiri chillies.',
    price: '₹349',
    likes: '18.4K',
    comments: '1.2K',
    bgFrom: '#7B2D00', bgMid: '#2D1200',
    foodColor: 'radial-gradient(circle at 35% 35%, #FF8C42, #C34A00, #6B2800)',
    isLive: true,
    initialLiked: false,
  },
  {
    id: 2,
    chef: 'MP',
    chefName: 'Milano Pasta Co.',
    handle: '@milanopasta • 210K followers',
    avatarGrad: 'linear-gradient(135deg,#52D98A,#1A9A55)',
    title: 'Truffle Pesto\nPerfection',
    tags: ['#Italian', '#Truffle', '#PastaLover'],
    desc: 'Hand-rolled tagliatelle. Fresh basil pesto. A generous shave of black truffle.',
    price: '₹529',
    likes: '32.1K',
    comments: '2.8K',
    bgFrom: '#006B3C', bgMid: '#002D1A',
    foodColor: 'radial-gradient(circle at 35% 35%, #52D98A, #1A9A55, #0A4D2A)',
    isLive: false,
    initialLiked: false,
  },
  {
    id: 3,
    chef: 'TC',
    chefName: 'TacoLord',
    handle: '@taco.lord • 450K followers',
    avatarGrad: 'linear-gradient(135deg,#FF6B8A,#C91A45)',
    title: 'Viral Birria\nQuesatacos 🌮',
    tags: ['#Mexican', '#Birria', '#Viral'],
    desc: 'Slow-braised beef in guajillo consommé, cheese-fried corn tortillas. Dunk it deep.',
    price: '₹299',
    likes: '98.3K',
    comments: '8.1K',
    bgFrom: '#6B0020', bgMid: '#2D0010',
    foodColor: 'radial-gradient(circle at 35% 35%, #FF6B8A, #C91A45, #6B0020)',
    isLive: false,
    initialLiked: true,
  },
  {
    id: 4,
    chef: 'DD',
    chefName: 'Dessert Diaries',
    handle: '@dessert.diaries • 120K followers',
    avatarGrad: 'linear-gradient(135deg,#FFD166,#C4830A)',
    title: 'Alphonso Mango\nKulfi Bar',
    tags: ['#Dessert', '#SummerVibes', '#Mango'],
    desc: 'Made with 100% Alphonso pulp, condensed milk, and a pinch of cardamom. Pure summer.',
    price: '₹149',
    likes: '44.2K',
    comments: '3.4K',
    bgFrom: '#5B3000', bgMid: '#2D1A00',
    foodColor: 'radial-gradient(circle at 35% 35%, #FFD166, #C4830A, #5B3000)',
    isLive: false,
    initialLiked: false,
  },
];

const mosaicItems = [
  { grad: 'radial-gradient(circle at 40% 40%,#C34A00,#6B2800,#1A0800)', label: 'Butter Chicken', likes: '18.4K', span: 'rowSpan2' },
  { grad: 'radial-gradient(circle at 60% 60%,#006B3C,#002D1A,#000C07)', label: 'Truffle Pasta', likes: '32K', span: '' },
  { grad: 'radial-gradient(circle at 50% 30%,#6B0020,#2D0010,#0A0005)', label: 'Birria Tacos', likes: '98K', span: '' },
  { grad: 'radial-gradient(circle at 35% 60%,#5B3000,#2D1A00,#0A0700)', label: 'Mango Kulfi', likes: '44K', span: 'colSpan2' },
];

const userFeatures = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    title: 'Discover Through Sight & Sound',
    desc: 'Your feed learns your taste. The more you engage, the more it knows — biryanis at midnight, smoothie bowls in the morning.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    title: 'Save Your Cravings',
    desc: 'Heart a reel at midnight, order it for lunch. Your saved collection is a curated menu built entirely by your own appetite.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    title: 'One-Tap Ordering',
    desc: 'The "Order Now" button floats over every reel. From craving to checkout in under 12 seconds.',
  },
];

const steps = [
  { n: '1', strong: 'Create your reel.', rest: ' Film your dish being cooked, plated, enjoyed. Raw, real, delicious.' },
  { n: '2', strong: 'Upload & tag.', rest: ' Set your price, delivery zone, cuisine tags. ZReels auto-generates captions.' },
  { n: '3', strong: 'Go live in the feed.', rest: ' Your reel surfaces in thousands of feeds via appetite-matching algorithms.' },
  { n: '4', strong: 'Earn directly.', rest: ' Every order converts at your set price. No commission on your first ₹10,000.' },
];

// === HELPERS ===
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimBox({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// === COMPONENTS ===
function FeatCard({ icon, title, desc, delay }) {
  return (
    <AnimBox delay={delay} style={{
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, padding: '24px',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'rgba(245,245,247,0.58)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{desc}</div>
    </AnimBox>
  );
}

function ActionBar({ reel }) {
  const [liked, setLiked] = useState(reel.initialLiked);
  return (
    <div style={{
      position: 'absolute', right: '16px', bottom: '110px', zIndex: 10,
      display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center',
    }}>
      <div onClick={() => setLiked(l => !l)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%',
          background: liked ? 'rgba(255,77,77,0.2)' : 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)', border: `1px solid ${liked ? 'rgba(255,77,77,0.4)' : 'rgba(255,255,255,0.12)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? '#FF4D4D' : 'none'} stroke={liked ? '#FF4D4D' : '#F5F5F7'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(245,245,247,0.6)', fontFamily: 'var(--font-body)' }}>{reel.likes}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(245,245,247,0.6)', fontFamily: 'var(--font-body)' }}>{reel.comments}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.8"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(245,245,247,0.6)', fontFamily: 'var(--font-body)' }}>Share</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(245,245,247,0.6)', fontFamily: 'var(--font-body)' }}>Save</span>
      </div>
    </div>
  );
}

function ReelSlide({ reel }) {
  const [following, setFollowing] = useState(false);
  return (
    <div style={{
      height: '100vh', scrollSnapAlign: 'start',
      position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 40% 55%, ${reel.bgFrom} 0%, ${reel.bgMid} 40%, #0A0A0F 100%)`,
        animation: 'slowZoom 10s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.45) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 200, height: 200, borderRadius: '50%',
          background: reel.foodColor,
          animation: 'slowZoom 12s ease-in-out infinite alternate',
          position: 'relative', opacity: 0.88,
        }}>
          <div style={{ position: 'absolute', inset: '15%', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', top: '8%', left: '20%', width: '30%', height: '20%', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', transform: 'rotate(-30deg)' }} />
        </div>
      </div>
      {reel.isLive && (
        <div style={{
          position: 'absolute', top: 80, left: 16, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(220,30,30,0.85)', backdropFilter: 'blur(12px)',
          borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 700,
          fontFamily: 'var(--font-ui)', letterSpacing: '0.1em',
          border: '1px solid rgba(255,100,100,0.3)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1.2s infinite' }} />
          LIVE
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 90, left: 16, right: 72, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: reel.avatarGrad, border: '2px solid #FF4D4D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-display)', flexShrink: 0,
          }}>{reel.chef}</div>
          <div style={{ flex: 1 }}>
             <div style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-ui)' }}>{reel.chefName}</div>
             <div style={{ fontSize: 12, color: 'rgba(245,245,247,0.55)', fontFamily: 'var(--font-body)' }}>{reel.handle}</div>
          </div>
          <button onClick={() => setFollowing(f => !f)} style={{
            padding: '5px 14px', borderRadius: 20, border: 'none',
            background: following ? 'rgba(255,255,255,0.1)' : '#FF4D4D',
            color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-ui)',
            transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0,
          }}>{following ? 'Following' : '+ Follow'}</button>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
          lineHeight: 1.1, marginBottom: 8, whiteSpace: 'pre-line', textShadow: '0 2px 24px rgba(0,0,0,0.9)',
        }}>{reel.title}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {reel.tags.map(tag => (
            <span key={tag} style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 11,
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(245,245,247,0.7)', fontFamily: 'var(--font-body)',
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(245,245,247,0.6)', lineHeight: 1.55, fontFamily: 'var(--font-body)', marginBottom: 14 }}>{reel.desc}</div>
        <div style={{
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.13)', borderRadius: 20, padding: '13px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(245,245,247,0.4)', fontFamily: 'var(--font-body)' }}>Starting from</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{reel.price}</div>
          </div>
          <button style={{
            background: '#FF4D4D', color: '#fff', border: 'none', borderRadius: 14, padding: '12px 20px',
            fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            Order Now
          </button>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 72, left: 16, right: 16, zIndex: 10, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
        <div style={{ height: '100%', background: '#FF4D4D', borderRadius: 2, animation: 'progress 8s linear infinite' }} />
      </div>
      <ActionBar reel={reel} />
    </div>
  );
}

function ReelFeed() {
  return (
    <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}>
      {reelData.map(reel => <ReelSlide key={reel.id} reel={reel} />)}
    </div>
  );
}

function FeedView({ setActiveTab }) {
  return (
    <div style={{ position: 'relative', background: 'var(--obsidian)' }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)', pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', pointerEvents: 'auto' }}>
          Z<span style={{ color: 'var(--coral)' }}>Reels</span>
        </div>
        <div style={{ display: 'flex', gap: 10, pointerEvents: 'auto' }}>
          {[
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.8"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.8"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
          ].map((icon, i) => (
            <div key={i} onClick={() => { if(i===1) setActiveTab('about') }} style={{
              width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
            }}>{icon}</div>
          ))}
        </div>
      </div>
      <ReelFeed />
    </div>
  );
}

function AboutView({ setActiveTab }) {
  return (
    <div style={{ background: 'var(--obsidian)', paddingBottom: 140 }}>
      {/* Top nav */}
      <div style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
        background: 'rgba(12,12,18,0.88)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50,
        padding: '10px 20px', display: 'flex', gap: 16, alignItems: 'center', whiteSpace: 'nowrap',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
          Z<span style={{ color: 'var(--coral)' }}>Reels</span>
        </span>
        <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)' }} />
        <button onClick={() => setActiveTab('feed')} style={{ background: 'none', color: 'rgba(245,245,247,0.55)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>Feed</button>
        <button onClick={() => setActiveTab('about')} style={{ background: 'none', color: 'var(--coral)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>About</button>
        <button style={{ background: 'var(--coral)', color: '#fff', padding: '8px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600 }}>Get Early Access</button>
      </div>

      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: '#FF4D4D', top: -200, right: -180, filter: 'blur(130px)', animation: 'pulse 5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: '#7B3FF5', bottom: -120, left: -120, filter: 'blur(130px)', animation: 'pulse 6s ease-in-out infinite 1s' }} />

        <AnimBox>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', color: '#FF4D4D' }}>
            <div style={{ width: 24, height: 1, background: '#FF4D4D' }} />
            The Future of Food Discovery
          </div>
        </AnimBox>
        <AnimBox delay={80}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(44px, 10vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 32 }}>
            <span style={{ color: 'rgba(245,245,247,0.38)', fontWeight: 400 }}>Stop reading</span><br />
            <span style={{ textDecoration: 'line-through', textDecorationColor: '#FF4D4D', textDecorationThickness: 3 }}>boring menus</span><br />
            Eat with your<br /><em style={{ color: '#FF4D4D', fontStyle: 'normal' }}>eyes first.</em>
          </h1>
        </AnimBox>
        <AnimBox delay={160}>
          <p style={{ fontSize: 17, color: 'rgba(245,245,247,0.6)', lineHeight: 1.75, fontFamily: 'var(--font-body)', maxWidth: 480, marginBottom: 40 }}>
            ZReels is a snap-scroll food platform where every dish tells its own story — through sizzle, steam, and high-speed video.
          </p>
        </AnimBox>
        <AnimBox delay={220}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('feed')} style={{
              background: '#FF4D4D', color: '#fff', padding: '15px 28px', borderRadius: 50,
              fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Watch the Feed
            </button>
            <button style={{
              background: 'transparent', color: '#F5F5F7', padding: '15px 28px', borderRadius: 50,
              fontSize: 15, fontWeight: 500, border: '1px solid rgba(255,255,255,0.14)',
            }}>For Restaurants →</button>
          </div>
        </AnimBox>

        <AnimBox delay={300} style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { num: '2.4', unit: 'M+', label: 'Monthly Active Users' },
              { num: '18', unit: 'K+', label: 'Food Creators' },
              { num: '94', unit: '%', label: 'Order Conversion via Reels' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{s.num}<span style={{ color: '#FF4D4D' }}>{s.unit}</span></div>
                <div style={{ fontSize: 13, color: 'rgba(245,245,247,0.38)', fontFamily: 'var(--font-body)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </AnimBox>
      </div>

      {/* Reel Mosaic */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 20px', maxWidth: 600, margin: '0 auto 60px' }}>
        {mosaicItems.map((m, i) => {
          const [ref, visible] = useInView(0.1);
          return (
            <div key={i} ref={ref} style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                height: m.span === 'rowSpan2' ? 320 : m.span === 'colSpan2' ? 150 : 150,
                gridRow: m.span === 'rowSpan2' ? 'span 2' : undefined, gridColumn: m.span === 'colSpan2' ? 'span 2' : undefined,
                opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.94)',
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
            }}>
              <div style={{ width: '100%', height: '100%', background: m.grad, animation: 'slowZoom 12s ease-in-out infinite alternate' }} />
              <div style={{
                position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 12,
              }}>
                <div style={{
                  alignSelf: 'center', marginTop: '30%', width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,77,77,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 2 }}><polygon points="5 3 19 12 5 21 5 3" /></svg></div>
                <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'rgba(255,255,255,0.9)' }}>
                  {m.label} • ❤ {m.likes}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0 24px', maxWidth: 600, margin: '0 auto 60px' }}>
        <AnimBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D4D', fontFamily: 'var(--font-ui)' }}>
            For Food Lovers
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(255,77,77,0.4), transparent)' }} />
          </div>
        </AnimBox>
        <AnimBox delay={80}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(30px,6vw,50px)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Discover food the way<br />it was <span style={{ color: '#FF4D4D' }}>meant to be.</span>
          </h2>
        </AnimBox>
        <AnimBox delay={120}>
           <p style={{ fontSize: 16, color: 'rgba(245,245,247,0.58)', lineHeight: 1.8, fontFamily: 'var(--font-body)', marginBottom: 32 }}>
            No more guessing from blurry menu photos. Watch every dish sizzle and plate in real-time short-form video — then order with one tap.
          </p>
        </AnimBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {userFeatures.map((f, i) => <FeatCard key={f.title} {...f} delay={i * 80} />)}
        </div>
      </div>

      {/* For Partners */}
      <AnimBox style={{ maxWidth: 552, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,77,77,0.09), rgba(255,77,77,0.03))', border: '1px solid rgba(255,77,77,0.22)',
          borderRadius: 24, padding: '32px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D4D', fontFamily: 'var(--font-ui)' }}>
            For Food Partners
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,rgba(255,77,77,0.4),transparent)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px,5vw,40px)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 14 }}>
            Your kitchen deserves<br />a <span style={{ color: '#FF4D4D' }}>stage.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(245,245,247,0.58)', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: 24 }}>
            Ditch the static menu. Upload a 30-second reel of your best dish. Let the food speak — and watch orders fly in.
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,77,77,0.3)', borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 24,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,77,77,0.15)', margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(245,245,247,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              <strong style={{ color: '#FF4D4D', fontFamily: 'var(--font-ui)' }}>Drop your reel here</strong><br />MP4 · up to 60 seconds
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  minWidth: 28, height: 28, borderRadius: '50%', background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#FF4D4D', fontFamily: 'var(--font-display)',
                }}>{s.n}</div>
                <p style={{ fontSize: 14, color: 'rgba(245,245,247,0.58)', fontFamily: 'var(--font-body)', lineHeight: 1.65, paddingTop: 4 }}>
                  <strong style={{ color: '#F5F5F7', fontWeight: 600 }}>{s.strong}</strong>{s.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimBox>

      <AnimBox style={{ textAlign: 'center', padding: '80px 24px 0', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 60 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px,9vw,70px)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 24 }}>
          The future<br />of food is<br /><span style={{ color: '#FF4D4D' }}>vertical.</span>
        </h2>
        <p style={{ color: 'rgba(245,245,247,0.55)', fontSize: 16, fontFamily: 'var(--font-body)', marginBottom: 32, maxWidth: 380, margin: '0 auto 32px', lineHeight: 1.75 }}>
          Join 2.4 million food lovers and 18,000 creators already on the platform.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('feed')} style={{ background: '#FF4D4D', color: '#fff', padding: '16px 32px', borderRadius: 50, fontSize: 16, fontWeight: 600 }}>Start Eating Smarter</button>
          <button style={{ background: 'transparent', color: '#F5F5F7', padding: '16px 32px', borderRadius: 50, fontSize: 16, fontWeight: 500, border: '1px solid rgba(255,255,255,0.14)' }}>Partner With Us</button>
        </div>
      </AnimBox>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--obsidian)', gap: 16,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em' }}>{title}</h1>
      <p style={{ color: 'rgba(245,245,247,0.45)', fontFamily: 'var(--font-body)', fontSize: 15 }}>Coming soon — stay hungry.</p>
    </div>
  );
}

// === MAIN EXPORT ===
export default function SingleHomepage() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="zreels-app-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        .zreels-app-wrapper {
          --coral: #FF4D4D;
          --obsidian: #0A0A0F;
          --font-display: 'Syne', sans-serif;
          --font-ui: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
          background: var(--obsidian);
          color: #F5F5F7;
          font-family: var(--font-ui);
          min-height: 100vh;
        }
        .zreels-app-wrapper button { cursor: pointer; border: none; font-family: var(--font-ui); outline: none; }
        .zreels-app-wrapper * { box-sizing: border-box; scrollbar-width: none; }
        .zreels-app-wrapper ::-webkit-scrollbar { width: 0; }
        
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.07); } }
        @keyframes pulse { 0%,100% { opacity:0.12; transform:scale(1); } 50% { opacity:0.18; transform:scale(1.05); } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>

      {activeTab === 'feed' && <FeedView setActiveTab={setActiveTab} />}
      {activeTab === 'about' && <AboutView setActiveTab={setActiveTab} />}
    </div>
  );
}
