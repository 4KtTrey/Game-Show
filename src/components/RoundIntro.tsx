import { useEffect, useState } from 'react';

interface RoundIntroProps {
  round: number;
  title: string;
  description: string;
  questionCount: number;
  timePerQuestion: number;
  pointsPerQuestion: number;
  emoji: string;
  color: string;
  onContinue: () => void;
}

export function RoundIntro({ round, title, description, questionCount, timePerQuestion, pointsPerQuestion, emoji, color, onContinue }: RoundIntroProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className={`relative z-10 text-center px-6 max-w-2xl transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-7xl mb-6">{emoji}</div>
        <div className="mb-4">
          <span className={`inline-block px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase border`}
            style={{ backgroundColor: `${color}20`, color: color, borderColor: `${color}40` }}>
            Round {round}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{title}</h1>
        <p className="text-white/50 text-lg mb-8">{description}</p>

        <div className="flex justify-center gap-6 mb-10">
          <div className="bg-white/5 rounded-xl px-6 py-4 border border-white/10">
            <div className="text-2xl font-black text-white">{questionCount}</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Questions</div>
          </div>
          <div className="bg-white/5 rounded-xl px-6 py-4 border border-white/10">
            <div className="text-2xl font-black text-white">{timePerQuestion}s</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Per Question</div>
          </div>
          <div className="bg-white/5 rounded-xl px-6 py-4 border border-white/10">
            <div className="text-2xl font-black text-white">{pointsPerQuestion}</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Points Each</div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 20px 40px ${color}30` }}
        >
          Let's Go! →
        </button>
      </div>
    </div>
  );
}
