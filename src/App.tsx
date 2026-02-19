import { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { RoundIntro } from './components/RoundIntro';
import { QuestionSlide } from './components/QuestionSlide';
import { ScoreBoard } from './components/ScoreBoard';
import { trueFalseQuestions, fillBlankQuestions, structuredQuestions } from './data/questions';
import type { Question } from './data/questions';

type GamePhase =
  | 'start'
  | 'round1-intro'
  | 'round1'
  | 'round2-intro'
  | 'round2'
  | 'round3-intro'
  | 'round3'
  | 'results';

interface RoundScore {
  round: number;
  score: number;
  total: number;
  correct: number;
  questions: number;
}

export function App() {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState<RoundScore[]>([
    { round: 1, score: 0, total: 150, correct: 0, questions: 15 },
    { round: 2, score: 0, total: 100, correct: 0, questions: 5 },
    { round: 3, score: 0, total: 150, correct: 0, questions: 5 },
  ]);
  const [slideKey, setSlideKey] = useState(0);

  const getCurrentQuestions = (): Question[] => {
    if (phase === 'round1') return trueFalseQuestions;
    if (phase === 'round2') return fillBlankQuestions;
    if (phase === 'round3') return structuredQuestions;
    return [];
  };

  const getCurrentRound = (): number => {
    if (phase.startsWith('round1')) return 1;
    if (phase.startsWith('round2')) return 2;
    if (phase.startsWith('round3')) return 3;
    return 0;
  };

  const getPointsForRound = (round: number): number => {
    if (round === 1) return 10;
    if (round === 2) return 20;
    return 30;
  };

  const handleAnswer = useCallback((correct: boolean, _userAnswer: string) => {
    const round = getCurrentRound();
    const points = correct ? getPointsForRound(round) : 0;
    setScore(prev => prev + points);
    setRoundScores(prev =>
      prev.map(r =>
        r.round === round
          ? { ...r, score: r.score + points, correct: r.correct + (correct ? 1 : 0) }
          : r
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleNext = () => {
    const questions = getCurrentQuestions();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSlideKey(prev => prev + 1);
    } else {
      // Move to next phase
      if (phase === 'round1') {
        setCurrentQuestionIndex(0);
        setPhase('round2-intro');
      } else if (phase === 'round2') {
        setCurrentQuestionIndex(0);
        setPhase('round3-intro');
      } else if (phase === 'round3') {
        setPhase('results');
      }
    }
  };

  const handleRestart = () => {
    setPhase('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setRoundScores([
      { round: 1, score: 0, total: 150, correct: 0, questions: 15 },
      { round: 2, score: 0, total: 100, correct: 0, questions: 5 },
      { round: 3, score: 0, total: 150, correct: 0, questions: 5 },
    ]);
    setSlideKey(0);
  };

  const roundColors: Record<number, string> = {
    1: '#22c55e',
    2: '#3b82f6',
    3: '#a855f7',
  };

  // Render based on phase
  if (phase === 'start') {
    return <StartScreen onStart={() => setPhase('round1-intro')} />;
  }

  if (phase === 'round1-intro') {
    return (
      <RoundIntro
        round={1}
        title="True or False"
        description="Decide if each statement about Participatory Monitoring & Evaluation is true or false."
        questionCount={15}
        timePerQuestion={20}
        pointsPerQuestion={10}
        emoji="✅"
        color="#22c55e"
        onContinue={() => { setCurrentQuestionIndex(0); setSlideKey(prev => prev + 1); setPhase('round1'); }}
      />
    );
  }

  if (phase === 'round2-intro') {
    return (
      <RoundIntro
        round={2}
        title="Fill in the Blank"
        description="Complete each sentence with the correct PME term or concept."
        questionCount={5}
        timePerQuestion={30}
        pointsPerQuestion={20}
        emoji="✏️"
        color="#3b82f6"
        onContinue={() => { setCurrentQuestionIndex(0); setSlideKey(prev => prev + 1); setPhase('round2'); }}
      />
    );
  }

  if (phase === 'round3-intro') {
    return (
      <RoundIntro
        round={3}
        title="Structured Questions"
        description="Write detailed answers to demonstrate your deep understanding of PME concepts."
        questionCount={5}
        timePerQuestion={90}
        pointsPerQuestion={30}
        emoji="📝"
        color="#a855f7"
        onContinue={() => { setCurrentQuestionIndex(0); setSlideKey(prev => prev + 1); setPhase('round3'); }}
      />
    );
  }

  if (phase === 'results') {
    return (
      <ScoreBoard
        score={score}
        totalPossible={400}
        roundScores={roundScores}
        onRestart={handleRestart}
      />
    );
  }

  // Question phases
  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const round = getCurrentRound();

  if (!currentQuestion) return null;

  return (
    <QuestionSlide
      key={slideKey}
      question={currentQuestion}
      questionIndex={currentQuestionIndex}
      totalInRound={questions.length}
      round={round}
      roundColor={roundColors[round]}
      score={score}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  );
}
