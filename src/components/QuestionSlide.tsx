import { useState, useCallback } from 'react';
import { Timer } from './Timer';
import type { TrueFalseQuestion, FillBlankQuestion, StructuredQuestion, Question } from '../data/questions';

interface QuestionSlideProps {
  question: Question;
  questionIndex: number;
  totalInRound: number;
  round: number;
  roundColor: string;
  score: number;
  onAnswer: (correct: boolean, userAnswer: string) => void;
  onNext: () => void;
}

export function QuestionSlide({ question, questionIndex, totalInRound, round, roundColor, score, onAnswer, onNext }: QuestionSlideProps) {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timerRunning, setTimerRunning] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selfMarked, setSelfMarked] = useState(false);

  const duration = question.type === 'trueFalse' ? 20 : question.type === 'fillBlank' ? 30 : 90;

  const handleTimeUp = useCallback(() => {
    if (!answered) {
      setAnswered(true);
      setIsCorrect(false);
      setTimerRunning(false);
      setShowExplanation(true);
      onAnswer(false, 'Time Up');
    }
  }, [answered, onAnswer]);

  const handleTrueFalse = (answer: boolean) => {
    if (answered) return;
    const q = question as TrueFalseQuestion;
    const correct = answer === q.answer;
    setAnswered(true);
    setIsCorrect(correct);
    setTimerRunning(false);
    setShowExplanation(true);
    setUserAnswer(answer ? 'True' : 'False');
    onAnswer(correct, answer ? 'True' : 'False');
  };

  const handleFillBlank = () => {
    if (answered || !userAnswer.trim()) return;
    const q = question as FillBlankQuestion;
    const correct = userAnswer.trim().toLowerCase() === q.blank.toLowerCase();
    setAnswered(true);
    setIsCorrect(correct);
    setTimerRunning(false);
    setShowExplanation(true);
    onAnswer(correct, userAnswer);
  };

  const handleStructuredSubmit = () => {
    if (answered) return;
    setAnswered(true);
    setTimerRunning(false);
    setShowExplanation(true);
  };

  const handleSelfMark = (correct: boolean) => {
    if (selfMarked) return;
    setSelfMarked(true);
    setIsCorrect(correct);
    onAnswer(correct, userAnswer);
  };

  const getRoundLabel = () => {
    if (round === 1) return 'TRUE OR FALSE';
    if (round === 2) return 'FILL IN THE BLANK';
    return 'STRUCTURED';
  };

  const getPoints = () => {
    if (round === 1) return 10;
    if (round === 2) return 20;
    return 30;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${roundColor}, transparent)` }} />
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: roundColor }} />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: roundColor }} />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ backgroundColor: `${roundColor}20`, color: roundColor, borderColor: `${roundColor}40` }}>
            Round {round}
          </span>
          <span className="text-white/40 text-sm font-medium">{getRoundLabel()}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-white/40 uppercase tracking-wider">Score</div>
            <div className="text-xl font-black text-white">{score}</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 px-4 md:px-8">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((questionIndex + 1) / totalInRound) * 100}%`,
              background: `linear-gradient(90deg, ${roundColor}, ${roundColor}cc)`
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/30 text-xs">Question {questionIndex + 1} of {totalInRound}</span>
          <span className="text-white/30 text-xs">{getPoints()} points</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
        <div className="w-full max-w-3xl">
          {/* Timer */}
          <div className="flex justify-center mb-6">
            <Timer
              duration={duration}
              onTimeUp={handleTimeUp}
              isRunning={timerRunning}
              resetKey={question.id}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-6 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                style={{ backgroundColor: `${roundColor}25`, color: roundColor }}>
                {question.id}
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed flex-1">
                {question.type === 'fillBlank'
                  ? (question as FillBlankQuestion).question.replace('_______', '________')
                  : question.question}
              </h2>
            </div>

            {/* True/False buttons */}
            {question.type === 'trueFalse' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleTrueFalse(true)}
                  disabled={answered}
                  className={`py-5 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                    answered
                      ? (question as TrueFalseQuestion).answer === true
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : userAnswer === 'True'
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/5 border-white/10 text-white hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 active:scale-95'
                  }`}
                >
                  ✓ TRUE
                </button>
                <button
                  onClick={() => handleTrueFalse(false)}
                  disabled={answered}
                  className={`py-5 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                    answered
                      ? (question as TrueFalseQuestion).answer === false
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : userAnswer === 'False'
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/5 border-white/10 text-white hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 active:scale-95'
                  }`}
                >
                  ✗ FALSE
                </button>
              </div>
            )}

            {/* Fill in the blank */}
            {question.type === 'fillBlank' && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    disabled={answered}
                    placeholder="Type your answer..."
                    onKeyDown={e => e.key === 'Enter' && handleFillBlank()}
                    className="flex-1 bg-white/10 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg font-medium placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                  {!answered && (
                    <button
                      onClick={handleFillBlank}
                      className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform"
                    >
                      Submit
                    </button>
                  )}
                </div>
                {answered && (
                  <div className={`flex items-center gap-2 text-sm font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{isCorrect ? '✓' : '✗'}</span>
                    <span>Correct answer: <span className="text-white font-bold">{(question as FillBlankQuestion).blank}</span></span>
                  </div>
                )}
              </div>
            )}

            {/* Structured */}
            {question.type === 'structured' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  disabled={answered}
                  placeholder="Write your detailed answer here..."
                  rows={5}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-base font-medium placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 resize-none"
                />
                {!answered && (
                  <button
                    onClick={handleStructuredSubmit}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    Submit Answer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Feedback / Explanation */}
          {showExplanation && (
            <div className={`rounded-2xl p-5 md:p-6 border mb-6 transition-all duration-500 ${
              isCorrect === true
                ? 'bg-green-500/10 border-green-500/30'
                : isCorrect === false
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/5 border-white/10'
            }`}>
              {/* Result badge */}
              {isCorrect !== null && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-3 ${
                  isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <span>{isCorrect ? '🎉 Correct!' : '❌ Incorrect'}</span>
                  {isCorrect && <span>+{getPoints()} pts</span>}
                </div>
              )}

              {/* Explanation or sample answer */}
              {question.type !== 'structured' && (
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-white/90 font-semibold">Explanation: </span>
                  {(question as TrueFalseQuestion | FillBlankQuestion).explanation}
                </p>
              )}

              {question.type === 'structured' && (
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">Sample Answer</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {(question as StructuredQuestion).sampleAnswer}
                  </p>
                  {!selfMarked && (
                    <div className="mt-4 space-y-2">
                      <p className="text-white/60 text-sm font-semibold">How did you do? Rate yourself:</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSelfMark(true)}
                          className="flex-1 py-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-bold hover:bg-green-500/30 transition-colors"
                        >
                          ✓ Got it Right (+{getPoints()} pts)
                        </button>
                        <button
                          onClick={() => handleSelfMark(false)}
                          className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold hover:bg-red-500/30 transition-colors"
                        >
                          ✗ Need Improvement
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Next button */}
          {answered && (question.type !== 'structured' || selfMarked) && (
            <div className="flex justify-center">
              <button
                onClick={onNext}
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${roundColor}, ${roundColor}cc)`, boxShadow: `0 10px 30px ${roundColor}30` }}
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
