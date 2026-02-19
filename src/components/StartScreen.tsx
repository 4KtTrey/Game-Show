interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Trophy icon */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-amber-400/30 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold tracking-wider uppercase border border-cyan-500/30">
            🎬 Game Show Edition
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-4 leading-tight">
          PME QUIZ
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-white/70 mb-2">
          Participatory Monitoring & Evaluation
        </h2>
        <p className="text-white/40 text-base mb-10 max-w-lg mx-auto">
          Test your knowledge with 25 challenging questions across 3 rounds. Beat the clock and score big!
        </p>

        {/* Round info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-green-400/40 transition-all duration-300 group">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-green-400 font-bold text-lg">Round 1</h3>
            <p className="text-white/50 text-sm">15 True or False</p>
            <p className="text-white/30 text-xs mt-1">20 sec each · 10 pts</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-blue-400/40 transition-all duration-300 group">
            <div className="text-3xl mb-2">✏️</div>
            <h3 className="text-blue-400 font-bold text-lg">Round 2</h3>
            <p className="text-white/50 text-sm">5 Fill in the Blanks</p>
            <p className="text-white/30 text-xs mt-1">30 sec each · 20 pts</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-purple-400 font-bold text-lg">Round 3</h3>
            <p className="text-white/50 text-sm">5 Structured Questions</p>
            <p className="text-white/30 text-xs mt-1">90 sec each · 30 pts</p>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl text-white font-bold text-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>START THE SHOW</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
        </button>

        {/* Bottom text */}
        <p className="text-white/20 text-xs mt-8">Total possible score: 400 points</p>
      </div>
    </div>
  );
}
