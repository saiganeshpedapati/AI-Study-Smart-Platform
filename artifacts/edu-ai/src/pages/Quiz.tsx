import { useState } from "react";
import { useGenerateQuiz, useGetQuiz, useSubmitQuizAttempt, useListQuizzes, useDeleteQuiz, getListQuizzesQueryKey, getGetQuizQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { BookOpen, Loader2, ChevronRight, Trash2, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

type Phase = "list" | "generate" | "taking" | "results";

interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  feedback: Array<{ questionId: number; correct: boolean; selectedIndex: number; correctIndex: number; explanation: string }>;
}

export default function Quiz() {
  const [phase, setPhase] = useState<Phase>("list");
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [form, setForm] = useState({ topic: "", difficulty: "medium", questionCount: "5" });
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const { data: quizzes = [], isLoading: loadingList } = useListQuizzes();
  const { data: quizDetail } = useGetQuiz(activeQuizId!, {
    query: { enabled: !!activeQuizId, queryKey: getGetQuizQueryKey(activeQuizId!) },
  });

  const generateMutation = useGenerateQuiz({
    mutation: {
      onSuccess: (quiz) => {
        queryClient.invalidateQueries({ queryKey: getListQuizzesQueryKey() });
        setActiveQuizId(quiz.id);
        setAnswers([]);
        setCurrentQ(0);
        setResult(null);
        setPhase("taking");
      },
    },
  });

  const submitMutation = useSubmitQuizAttempt({
    mutation: {
      onSuccess: (data) => {
        setResult(data as QuizResult);
        setPhase("results");
        queryClient.invalidateQueries({ queryKey: getListQuizzesQueryKey() });
      },
    },
  });

  const deleteMutation = useDeleteQuiz({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListQuizzesQueryKey() }),
    },
  });

  function handleGenerate() {
    generateMutation.mutate({
      data: {
        topic: form.topic,
        difficulty: form.difficulty as "easy" | "medium" | "hard",
        questionCount: parseInt(form.questionCount),
      },
    });
  }

  function handleAnswer(index: number) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (!quizDetail) return;
    if (currentQ < quizDetail.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitMutation.mutate({ id: activeQuizId!, data: { answers } });
    }
  }

  function handleRetake() {
    setAnswers([]);
    setCurrentQ(0);
    setResult(null);
    setPhase("taking");
  }

  if (phase === "generate") {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <button onClick={() => setPhase("list")} className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1">&larr; Back</button>
        <h1 className="text-2xl font-bold text-foreground mb-2">Generate a Quiz</h1>
        <p className="text-muted-foreground mb-6">Our AI will create custom questions tailored to your topic.</p>
        <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Topic</label>
            <input
              type="text"
              placeholder="e.g. Photosynthesis, World War II, Calculus Derivatives..."
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Difficulty</label>
            <div className="flex gap-2">
              {["easy", "medium", "hard"].map((d) => (
                <button key={d} onClick={() => setForm({ ...form, difficulty: d })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize border transition-colors ${form.difficulty === d ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-input hover:bg-accent"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Number of Questions</label>
            <div className="flex gap-2">
              {["5", "10", "15", "20"].map((n) => (
                <button key={n} onClick={() => setForm({ ...form, questionCount: n })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${form.questionCount === n ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-input hover:bg-accent"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={!form.topic.trim() || generateMutation.isPending}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2">
            {generateMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating quiz...</> : "Generate Quiz"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "taking" && quizDetail) {
    const q = quizDetail.questions[currentQ];
    const progress = ((currentQ + 1) / quizDetail.questions.length) * 100;
    const selected = answers[currentQ];
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-foreground">{quizDetail.topic}</h1>
            <p className="text-xs text-muted-foreground capitalize">{quizDetail.difficulty}</p>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{currentQ + 1} / {quizDetail.questions.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        {!q ? null : (
          <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
            <p className="text-base font-semibold text-foreground mb-5 leading-relaxed">{q.question}</p>
            <div className="space-y-2 mb-6">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${selected === i ? "bg-primary/10 border-primary text-primary font-medium" : "bg-background border-input text-foreground hover:bg-accent"}`}>
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={selected === undefined || submitMutation.isPending}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2">
              {submitMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Grading...</> : currentQ < quizDetail.questions.length - 1 ? <>Next <ChevronRight className="w-4 h-4" /></> : "Submit Quiz"}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === "results" && result && quizDetail) {
    const pct = result.percentage;
    const grade = pct >= 90 ? "Excellent!" : pct >= 70 ? "Good job!" : pct >= 50 ? "Keep practicing" : "Needs improvement";
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm mb-6 text-center">
          <Trophy className={`w-10 h-10 mx-auto mb-3 ${pct >= 70 ? "text-chart-3" : "text-muted-foreground"}`} />
          <h1 className="text-2xl font-bold text-foreground mb-1">{grade}</h1>
          <p className="text-4xl font-bold text-primary mb-1">{pct}%</p>
          <p className="text-sm text-muted-foreground">{result.score} out of {result.total} correct</p>
          <div className="flex gap-2 mt-4 justify-center">
            <button onClick={handleRetake} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
            <button onClick={() => setPhase("list")} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              All Quizzes
            </button>
          </div>
        </div>
        <h2 className="font-semibold text-foreground mb-3">Question Review</h2>
        <div className="space-y-3">
          {quizDetail.questions.map((q, i) => {
            const fb = result.feedback[i];
            if (!fb) return null;
            return (
              <div key={q.id} className={`bg-card border rounded-xl p-4 shadow-sm ${fb.correct ? "border-chart-2/30" : "border-destructive/30"}`}>
                <div className="flex items-start gap-3">
                  {fb.correct ? <CheckCircle className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-2">{q.question}</p>
                    {!fb.correct && <p className="text-xs text-destructive mb-1">Your answer: <span className="font-medium">{q.options[fb.selectedIndex] ?? "Not answered"}</span></p>}
                    <p className={`text-xs mb-2 ${fb.correct ? "text-chart-2" : "text-muted-foreground"}`}>Correct: <span className="font-medium">{q.options[fb.correctIndex]}</span></p>
                    <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground text-sm mt-0.5">AI-generated quizzes on any topic</p>
        </div>
        <button onClick={() => setPhase("generate")} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <BookOpen className="w-4 h-4" /> New Quiz
        </button>
      </div>
      {loadingList ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : quizzes.length === 0 ? (
        <div className="text-center py-16 bg-card border border-card-border rounded-xl">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-1">No quizzes yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Generate your first AI quiz on any topic</p>
          <button onClick={() => setPhase("generate")} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Generate Quiz</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((q) => (
            <div key={q.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${q.difficulty === "easy" ? "bg-chart-2/10 text-chart-2" : q.difficulty === "medium" ? "bg-chart-3/10 text-chart-3" : "bg-destructive/10 text-destructive"}`}>{q.difficulty}</span>
                <button onClick={() => deleteMutation.mutate({ id: q.id })} className="p-1 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{q.topic}</h3>
              <p className="text-xs text-muted-foreground mb-4">{q.questionCount} questions</p>
              <button onClick={() => { setActiveQuizId(q.id); setAnswers([]); setCurrentQ(0); setResult(null); setPhase("taking"); }}
                className="w-full py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1">
                Take Quiz <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}