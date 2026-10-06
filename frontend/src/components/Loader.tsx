import React, { useEffect, useState, useRef } from 'react';
import './Loader.css';

/* ── Items: citrus fruits + leaves cycling one by one ─── */
const ITEMS = [
  { emoji: '🍋', label: 'Lemon Diagnostics', color: '#FFD700' },
  { emoji: '🍃', label: 'Citrus Foliage Scan', color: '#4CAF50' },
  { emoji: '🍊', label: 'Sweet Orange Health', color: '#FF8C00' },
  { emoji: '🌿', label: 'Fresh Leaf Analysis', color: '#8BC34A' },
  { emoji: '🍏', label: 'Lime Biosecurity', color: '#76C442' },
  { emoji: '🌱', label: 'Citrus Sprout Guard', color: '#8BC34A' },
  { emoji: '🍑', label: 'Grapefruit Pathology', color: '#FF6B6B' },
  { emoji: '🔬', label: 'ResNet & Random Forest Core', color: '#10B981' },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  /* ── Item cycle state ─────────────────────────────────── */
  const [itemIdx, setItemIdx] = useState(0);
  const [stage, setStage] = useState<'entering' | 'idle' | 'exiting'>('entering');

  /* ── Ambient gradient mesh canvas ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.15, y: 0.25, r: 0.45, color: [20, 90, 25], spd: 0.0007 },
      { x: 0.80, y: 0.65, r: 0.40, color: [160, 100, 10], spd: 0.0011 },
      { x: 0.50, y: 0.10, r: 0.30, color: [15, 70, 20], spd: 0.0009 },
      { x: 0.20, y: 0.80, r: 0.35, color: [180, 140, 0], spd: 0.0006 },
      { x: 0.85, y: 0.15, r: 0.28, color: [50, 120, 20], spd: 0.0013 },
    ];

    let t = 0;
    const tick = () => {
      t++;
      ctx.clearRect(0, 0, W, H);
      blobs.forEach((b, i) => {
        const cx = (b.x + Math.sin(t * b.spd * 60 + i) * 0.12) * W;
        const cy = (b.y + Math.cos(t * b.spd * 50 + i * 1.3) * 0.10) * H;
        const radius = b.r * Math.min(W, H) * 0.65;
        const [r, g, bb] = b.color;
        const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g2.addColorStop(0, `rgba(${r},${g},${bb},0.22)`);
        g2.addColorStop(0.5, `rgba(${r},${g},${bb},0.09)`);
        g2.addColorStop(1, `rgba(${r},${g},${bb},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Sequential cycle: enter → idle → exit → next ──────── */
  useEffect(() => {
    let cancelled = false;
    const runCycle = async (idx: number) => {
      if (cancelled) return;
      setItemIdx(idx);
      setStage('entering');
      await delay(450);
      if (cancelled) return;
      setStage('idle');
      await delay(400);
      if (cancelled) return;
      setStage('exiting');
      await delay(350);
      if (cancelled) return;
      runCycle((idx + 1) % ITEMS.length);
    };
    runCycle(0);
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Progress bar incrementer ──────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.max(1, Math.floor((100 - prev) / 6));
        return Math.min(100, prev + step);
      });
    }, 90);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !exiting) {
      const exitTimer = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 550);
      }, 350);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, exiting, onComplete]);

  const currentItem = ITEMS[itemIdx];

  const handleSkip = () => {
    setExiting(true);
    setTimeout(onComplete, 250);
  };

  return (
    <div className={`cg-loader-backdrop ${exiting ? 'exiting' : ''}`}>
      <canvas ref={canvasRef} className="cg-loader-canvas" />

      <div className="cg-loader-content">
        <div className="cg-loader-stage">
          <div className="cg-loader-ring" />
          <div className={`cg-loader-emoji ${stage}`}>{currentItem.emoji}</div>
        </div>

        <h2 className="cg-loader-title">CitrusGuard AI</h2>
        <div className="cg-loader-item-name">{currentItem.label}</div>

        <div className="cg-loader-progress-wrap">
          <div className="cg-loader-bar-bg">
            <div className="cg-loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="cg-loader-status">
          <span>INITIALIZING DUAL ENGINES</span>
          <span>{progress}%</span>
        </div>

        <button onClick={handleSkip} className="cg-loader-skip-btn">
          Enter Dashboard &rarr;
        </button>
      </div>
    </div>
  );
};
