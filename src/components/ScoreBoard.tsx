interface ScoreBoardProps {
  score: number;
  totalPossible: number;
  roundScores: { round: number; score: number; total: number; correct: number; questions: number }[];
  onRestart: () => void;
}

export function ScoreBoard({ score, totalPossible, roundScores, onRestart }: ScoreBoardProps) {
  const percentage = Math.round((score / totalPossible) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { label: 'OUTSTANDING!', emoji: '🏆', color: '#fbbf24' };
    if (percentage >= 75) return { label: 'EXCELLENT!', emoji: '🌟', color: '#22c55e' };
    if (percentage >= 60) return { label: 'GOOD JOB!', emoji: '👍', color: '#3b82f6' };
    if (percentage >= 40) return { label: 'KEEP LEARNING!', emoji: '📚', color: '#f59e0b' };
    return { label: 'TRY AGAIN!', emoji: '💪', color: '#ef4444' };
  };

  const grade = getGrade();

  const circumference = 2 * Math.PI * 70;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        {percentage >= 75 && (
          <>
            <div className="absolute top-10 left-[10%] text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🎉</div>
            <div className="absolute top-20 right-[15%] text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-20 left-[20%] text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🎊</div>
            <div className="absolute bottom-32 right-[10%] text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl w-full">
        {/* Title */}
        <div className="text-6xl mb-4">{grade.emoji}</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{grade.label}</h1>
        <p className="text-white/40 text-lg mb-8">Here's how you performed</p>

        {/* Score circle */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg width="180" height="180" className="transform -rotate-90">
              <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
              <circle
                cx="90" cy="90" r="70"
                fill="none"
                stroke={grade.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 2s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{percentage}%</span>
              <span className="text-white/40 text-sm font-medium">{score}/{totalPossible}</span>
            </div>
          </div>
        </div>

        {/* Round breakdown */}
        <div className="space-y-3 mb-8">
          {roundScores.map(r => {
            const roundPercentage = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
            const roundNames = ['True/False', 'Fill in Blank', 'Structured'];
            const roundColors = ['#22c55e', '#3b82f6', '#a855f7'];
            const roundEmojis = ['✅', '✏️', '📝'];
            return (
              <div key={r.round} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{roundEmojis[r.round - 1]}</span>
                    <div className="text-left">
                      <div className="text-white font-bold text-sm">Round {r.round}: {roundNames[r.round - 1]}</div>
                      <div className="text-white/40 text-xs">{r.correct}/{r.questions} correct</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black">{r.score}/{r.total}</div>
                    <div className="text-white/40 text-xs">{roundPercentage}%</div>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${roundPercentage}%`,
                      backgroundColor: roundColors[r.round - 1],
                      transitionDelay: `${r.round * 300}ms`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Play Again
        </button>
      </div>
    </div>
  );
}
