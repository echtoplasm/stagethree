import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LucideInfinity, List, Rotate3d, Spotlight } from 'lucide-react';
import { SignUp } from '../components/shared/navAuth/Signup';

export const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [promptSignUp, setPromptSignUp] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 60) + 1;
      const rows = Math.ceil(canvas.height / 60) + 1;

      // canvas grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.07)';
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        const x = (i * 60 + (frame * 0.3) % 60);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        const y = (j * 60 + (frame * 0.15) % 60);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // intersections of moving grid canvas
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i * 60 + (frame * 0.3) % 60);
          const y = (j * 60 + (frame * 0.15) % 60);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="landing">
      <canvas ref={canvasRef} className="landing-canvas" />

      {/* heading section */}
      <section className={`landing-hero ${visible ? 'landing-visible' : ''}`}>
        <div className="landing-eyebrow">
          <span className="landing-dot" />
          Professional Stage Plotting
        </div>
        <h1 className="landing-title">
          Design your stage<br />
          <span className="landing-accent">in three dimensions</span>
        </h1>
        <p className="landing-subtitle">
          StageThree is the production tool built for engineers, TDs, and event planners
          who need precision stage layouts, not guesswork.
        </p>
        <div className="landing-cta">
          <Link to="/app" className="btn btn-primary landing-btn-primary">
            Open App
          </Link>
          <button className="btn landing-btn-ghost"
            onClick={() => setPromptSignUp(true)}>
            Create Account
          </button>
        </div>
      </section>

      {/* features, i need to add some more features here */}
      <section className={`landing-features ${visible ? 'landing-visible' : ''}`}>
        <div className="landing-feature">
          <div className="landing-feature-icon"><Rotate3d size={20} /></div>
          <h3>Real-time 3D Plotting</h3>
          <p>Visualize your stage setup in three dimensions before load-in day.</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon"><LucideInfinity size={20} /></div>
          <h3>Unlimited Projects</h3>
          <p>Organize plots by project. Keep every tour, festival, and corporate event separate.</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon"><List size={20} /></div>
          <h3>Input List Built In</h3>
          <p>Channel-by-channel input lists attached to each stage plot. No more spreadsheets.</p>
        </div>
        <div className="landing-feature">
          <div className="landing-feature-icon"><Spotlight size={20} /></div>
          <h3>Stage Templates</h3>
          <p>Start from proven stage configurations or build from your own dimensions.</p>
        </div>
      </section>

      {/* bottom call to acttion */}
      <section className={`landing-bottom ${visible ? 'landing-visible' : ''}`}>
        <p className="landing-bottom-label">Ready to plot?</p>
        <button className="btn btn-primary landing-btn-primary"
          onClick={() => setPromptSignUp(true)}>
          Get Started Free
        </button>
      </section>
      {promptSignUp && (
        <SignUp
          onSuccess={() => setPromptSignUp(false)}
          onClose={() => setPromptSignUp(false)} />
      )}
    </div>


  );
};
