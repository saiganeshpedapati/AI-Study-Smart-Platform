import { useListQuizzes, useListSummaries, useListChatbotConversations, useGetQuizStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { BookOpen, MessageCircle, FileText, TrendingUp, Plus, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const { data: quizzes = [] } = useListQuizzes();
  const { data: summaries = [] } = useListSummaries();
  const { data: conversations = [] } = useListChatbotConversations();
  const { data: stats } = useGetQuizStats();

  const recentQuizzes = quizzes.slice(0, 3);
  const recentSummaries = summaries.slice(0, 3);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">AI Study Smart Platform</h1>
        <p className="text-muted-foreground mt-1">Your AI-powered learning dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">{quizzes.length}</span>
          </div>
          <p className="text-sm font-medium text-foreground">Quizzes Generated</p>
          <p className="text-xs text-muted-foreground mt-0.5">Test your knowledge</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-chart-2" />
            </div>
            <span className="text-3xl font-bold text-foreground">{summaries.length}</span>
          </div>
          <p className="text-sm font-medium text-foreground">Summaries Created</p>
          <p className="text-xs text-muted-foreground mt-0.5">Distilled knowledge</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-chart-3" />
            </div>
            <span className="text-3xl font-bold text-foreground">{conversations.length}</span>
          </div>
          <p className="text-sm font-medium text-foreground">Chat Conversations</p>
          <p className="text-xs text-muted-foreground mt-0.5">Ask your AI tutor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Quiz Breakdown</h2>
          </div>
          {stats && stats.difficultyBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.difficultyBreakdown.map((item) => {
                const total = stats.totalQuizzes || 1;
                const pct = Math.round((item.count / total) * 100);
                const colors: Record<string, string> = { easy: "bg-chart-2", medium: "bg-chart-3", hard: "bg-destructive" };
                const color = colors[item.difficulty] ?? "bg-primary";
                return (
                  <div key={item.difficulty}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize text-foreground font-medium">{item.difficulty}</span>
                      <span className="text-muted-foreground">{item.count} quizzes</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Generate some quizzes to see your breakdown</p>
          )}
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Topics Covered</h2>
          </div>
          {stats && stats.topicBreakdown.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.topicBreakdown.map((item) => (
                <span key={item.topic} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {item.topic}
                  <span className="bg-primary/20 text-primary rounded-full px-1.5 py-0.5 text-xs">{item.count}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No topics yet — start by generating a quiz</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Quizzes</h2>
            <Link href="/quiz" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {recentQuizzes.length > 0 ? (
            <div className="space-y-2">
              {recentQuizzes.map((q) => (
                <Link key={q.id} href={`/quiz/${q.id}`}>
                  <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground">{q.topic}</p>
                      <p className="text-xs text-muted-foreground capitalize">{q.difficulty} · {q.questionCount} questions</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">No quizzes yet</p>
              <Link href="/quiz">
                <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                  <Plus className="w-3.5 h-3.5" /> Generate Quiz
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Summaries</h2>
            <Link href="/summary" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {recentSummaries.length > 0 ? (
            <div className="space-y-2">
              {recentSummaries.map((s) => (
                <Link key={s.id} href="/summaries">
                  <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{s.topic}</p>
                      <p className="text-xs text-muted-foreground">{s.keyPoints.length} key points</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">No summaries yet</p>
              <Link href="/summary">
                <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                  <Plus className="w-3.5 h-3.5" /> Create Summary
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-primary to-primary/70 rounded-xl p-5 text-primary-foreground shadow-sm">
          <MessageCircle className="w-8 h-8 mb-3 opacity-90" />
          <h2 className="font-bold text-lg mb-1">Ask your AI Tutor</h2>
          <p className="text-sm opacity-80 mb-4">Get instant answers to any academic question with real-time streaming responses.</p>
          <Link href="/chatbot">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors border border-white/20">
              Start chatting <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}