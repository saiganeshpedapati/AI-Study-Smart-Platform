import { useState } from "react";
import { useGenerateSummary, useListSummaries, useDeleteSummary, getListSummariesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, Loader2, Trash2, CheckCircle } from "lucide-react";

export default function Summary() {
  const [form, setForm] = useState({ topic: "", content: "" });
  const [generatedId, setGeneratedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: summaries = [], isLoading } = useListSummaries();

  const generateMutation = useGenerateSummary({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: getListSummariesQueryKey() });
        setGeneratedId(data.id);
        setForm({ topic: "", content: "" });
      },
    },
  });

  const deleteMutation = useDeleteSummary({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListSummariesQueryKey() });
        if (generatedId) setGeneratedId(null);
      },
    },
  });

  const latestSummary = generatedId ? summaries.find((s) => s.id === generatedId) : null;

  function handleGenerate() {
    if (!form.topic.trim() || !form.content.trim()) return;
    setGeneratedId(null);
    generateMutation.mutate({ data: { topic: form.topic, content: form.content } });
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Generate Summary</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Paste any text and AI will distill the key points</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Input</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Topic / Title</label>
              <input type="text" placeholder="e.g. The French Revolution" value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Content to Summarize</label>
              <textarea placeholder="Paste your textbook chapter, lecture notes, article..." value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              <p className="text-xs text-muted-foreground mt-1">{form.content.length} characters</p>
            </div>
            <button onClick={handleGenerate} disabled={!form.topic.trim() || !form.content.trim() || generateMutation.isPending}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2">
              {generateMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating summary...</> : "Generate Summary"}
            </button>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Result</h2>
          {generateMutation.isPending ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">AI is reading and summarizing...</p>
            </div>
          ) : latestSummary ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Summary</h3>
                <p className="text-sm text-foreground leading-relaxed bg-accent/30 rounded-lg p-3">{latestSummary.summaryText}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Key Points</h3>
                <ul className="space-y-2">
                  {latestSummary.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Your AI summary will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Saved Summaries</h2>
          <span className="text-xs text-muted-foreground">{summaries.length} total</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : summaries.length === 0 ? (
          <div className="text-center py-10 bg-card border border-card-border rounded-xl">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No summaries yet — generate one above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((s) => (
              <div key={s.id} className={`bg-card border rounded-xl p-5 shadow-sm transition-all ${s.id === generatedId ? "border-primary/40 shadow-md" : "border-card-border"}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">{s.topic}</h3>
                  <button onClick={() => deleteMutation.mutate({ id: s.id })} className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed mb-3 line-clamp-3">{s.summaryText}</p>
                <div className="space-y-1">
                  {s.keyPoints.slice(0, 3).map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                  {s.keyPoints.length > 3 && <p className="text-xs text-muted-foreground pl-5">+{s.keyPoints.length - 3} more points</p>}
                </div>
                <p className="text-xs text-muted-foreground mt-3">{new Date(s.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}