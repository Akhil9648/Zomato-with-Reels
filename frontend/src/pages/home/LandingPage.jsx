import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// === DATA ===
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

function FeatCard({ icon, title, desc, delay }) {
  return (
    <AnimBox delay={delay} style={{
      background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'rgba(245,245,247,0.58)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{desc}</div>
    </AnimBox>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

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
          background: var(--obsidian); color: #F5F5F7; font-family: var(--font-ui); min-height: 100vh;
        }
        .zreels-app-wrapper button { cursor: pointer; border: none; font-family: var(--font-ui); outline: none; }
        .zreels-app-wrapper * { box-sizing: border-box; scrollbar-width: none; }
        .zreels-app-wrapper ::-webkit-scrollbar { width: 0; }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.07); } }
        @keyframes pulse { 0%,100% { opacity:0.12; transform:scale(1); } 50% { opacity:0.18; transform:scale(1.05); } }
      `}</style>

      <div style={{ background: 'var(--obsidian)', paddingBottom: 140 }}>
        {/* Top nav */}
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
          background: 'rgba(12,12,18,0.88)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50,
          padding: '10px 20px', display: 'flex', gap: 16, alignItems: 'center', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginRight: 10 }}>
            Z<span style={{ color: 'var(--coral)' }}>Reels</span>
          </span>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)' }} />
          <button onClick={() => navigate('/user/login')} style={{ background: 'none', color: '#F5F5F7', fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-ui)' }}>Log In</button>
          <button onClick={() => navigate('/register')} style={{ background: 'var(--coral)', color: '#fff', padding: '8px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600 }}>Home</button>
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
              <button onClick={() => navigate('/user/login')} style={{
                background: '#FF4D4D', color: '#fff', padding: '15px 28px', borderRadius: 50,
                fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                Start Eating Smarter
              </button>
            </div>
          </AnimBox>

          <AnimBox delay={300} style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { num: '7', unit: '', label: 'Monthly Active Users' },
                { num: '18', unit: '', label: 'Food Creators' },
                { num: '94', unit: '%', label: 'Order Conversion' },
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

        <AnimBox style={{ maxWidth: 552, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,77,77,0.09), rgba(255,77,77,0.03))', border: '1px solid rgba(255,77,77,0.22)', borderRadius: 24, padding: '32px 24px',
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
      </div>
    </div>
  );
}
