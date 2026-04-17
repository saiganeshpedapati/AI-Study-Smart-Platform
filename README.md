<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Study Smart Platform — README</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0f1117;
      color: #e2e8f0;
      line-height: 1.7;
      padding: 40px 20px 80px;
    }

    .container { max-width: 900px; margin: 0 auto; }

    .hero {
      background: linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0f0f1a 100%);
      border: 1px solid #4338ca40;
      border-radius: 16px;
      padding: 48px 40px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: "";
      position: absolute;
      top: -60px; right: -60px;
      width: 240px; height: 240px;
      background: radial-gradient(circle, #6366f130 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero-badge {
      display: inline-block;
      background: #4f46e520;
      border: 1px solid #6366f140;
      color: #a5b4fc;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    .hero h1 {
      font-size: 2.4rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .hero p { font-size: 1.05rem; color: #94a3b8; max-width: 600px; }
    .hero-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 24px;
      background: #4f46e5;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
    }
    .hero-link:hover { background: #4338ca; }

    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 40px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    h2 .icon {
      width: 28px; height: 28px;
      background: #4f46e520;
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    h3 { font-size: 1rem; font-weight: 600; color: #c7d2fe; margin: 20px 0 8px; }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .feature-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }
    .feature-card h3 { margin-top: 0; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }
    .feature-card h3 .dot { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; flex-shrink: 0; }
    .feature-card ul { list-style: none; padding: 0; }
    .feature-card ul li { font-size: 13px; color: #94a3b8; padding: 3px 0 3px 16px; position: relative; }
    .feature-card ul li::before { content: "–"; position: absolute; left: 0; color: #4f46e5; }

    table { width: 100%; border-collapse: collapse; font-size: 13.5px; margin: 8px 0 16px; border-radius: 10px; overflow: hidden; }
    thead tr { background: #1e293b; }
    thead th { text-align: left; padding: 10px 14px; font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #334155; }
    tbody tr { border-bottom: 1px solid #1e293b; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #1e293b60; }
    tbody td { padding: 9px 14px; color: #cbd5e1; }
    td code, th code { background: #312e81; color: #a5b4fc; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-family: monospace; }

    .method { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
    .method-get  { background: #14532d; color: #86efac; }
    .method-post { background: #1e3a5f; color: #93c5fd; }
    .method-del  { background: #450a0a; color: #fca5a5; }

    pre { background: #0d1117; border: 1px solid #1e293b; border-radius: 10px; padding: 18px 20px; overflow-x: auto; margin: 8px 0 16px; }
    pre code { font-family: "Fira Code", "Courier New", monospace; font-size: 13px; color: #a5f3fc; background: none; padding: 0; }
    .comment { color: #4b5563; }
    .cmd { color: #86efac; }

    .schema-list { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; padding: 0; }
    .schema-list li { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #94a3b8; }
    .schema-list li strong { display: block; color: #a5b4fc; font-family: monospace; font-size: 13px; margin-bottom: 4px; }

    .tree { background: #0d1117; border: 1px solid #1e293b; border-radius: 10px; padding: 18px 20px; font-family: "Fira Code", monospace; font-size: 13px; color: #94a3b8; line-height: 1.9; }
    .tree .dir  { color: #93c5fd; }
    .tree .note { color: #4b5563; }

    .env-item { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 12px; }
    .env-item code { background: #312e81; color: #a5b4fc; padding: 3px 8px; border-radius: 4px; font-family: monospace; font-size: 12px; white-space: nowrap; flex-shrink: 0; }
    .env-item p { font-size: 13px; color: #94a3b8; margin: 0; }

    .license-box { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; margin-top: 8px; }
    .license-icon { font-size: 28px; flex-shrink: 0; }
    .license-box p { font-size: 13px; color: #94a3b8; }
    .license-box strong { display: block; color: #e2e8f0; font-size: 15px; margin-bottom: 4px; }

    footer { margin-top: 60px; text-align: center; font-size: 12px; color: #475569; }

    @media (max-width: 600px) {
      .hero h1 { font-size: 1.7rem; }
      .hero { padding: 28px 20px; }
    }
  </style>
</head>
<body>
<div class="container">

  <div class="hero">
    <div class="hero-badge">Documentation</div>
    <h1>AI Study Smart Platform</h1>
    <p>An AI-powered educational platform that helps students learn smarter with AI-generated quizzes, content summaries, and a real-time AI tutor chatbot.</p>
    <a class="hero-link" href="https://quiz-bot-tutor--saiganesh1430.replit.app" target="_blank">&#127760; Live Demo</a>
  </div>

  <h2><span class="icon">&#10024;</span> Features</h2>
  <div class="features-grid">
    <div class="feature-card">
      <h3><span class="dot"></span> Quiz Generator</h3>
      <ul>
        <li>Enter any topic, choose Easy / Medium / Hard</li>
        <li>Pick 5, 10, 15, or 20 questions</li>
        <li>AI generates a full multiple-choice quiz instantly</li>
        <li>Take it one question at a time with progress bar</li>
        <li>Get scored results with explanations</li>
        <li>Retake quizzes or browse history</li>
      </ul>
    </div>
    <div class="feature-card">
      <h3><span class="dot"></span> Summary Generator</h3>
      <ul>
        <li>Paste any textbook chapter, notes, or article</li>
        <li>AI produces a concise 3–5 sentence summary</li>
        <li>Extracts 3–7 key bullet-point takeaways</li>
        <li>All summaries saved and reviewable anytime</li>
      </ul>
    </div>
    <div class="feature-card">
      <h3><span class="dot"></span> AI Tutor Chatbot</h3>
      <ul>
        <li>Create threads by subject (Calculus, Biology…)</li>
        <li>Real-time streaming answers via SSE</li>
        <li>Full conversation history retained</li>
        <li>Powered by GPT-5.2 with a tutoring prompt</li>
      </ul>
    </div>
  </div>

  <h2><span class="icon">&#128295;</span> Tech Stack</h2>
  <table>
    <thead><tr><th>Layer</th><th>Technology</th></tr></thead>
    <tbody>
      <tr><td>Frontend</td><td>React + Vite + TypeScript</td></tr>
      <tr><td>Styling</td><td>Tailwind CSS</td></tr>
      <tr><td>Routing</td><td>Wouter</td></tr>
      <tr><td>Data Fetching</td><td>TanStack React Query</td></tr>
      <tr><td>Backend</td><td>Express 5 + TypeScript</td></tr>
      <tr><td>Database</td><td>PostgreSQL + Drizzle ORM</td></tr>
      <tr><td>AI</td><td>OpenAI GPT-5.2 via Replit AI Integrations</td></tr>
      <tr><td>Monorepo</td><td>pnpm workspaces</td></tr>
    </tbody>
  </table>

  <h2><span class="icon">&#128193;</span> Project Structure</h2>
  <div class="tree">
    <span class="dir">├── artifacts/</span><br>
    &nbsp;&nbsp;<span class="dir">├── edu-ai/</span> <span class="note"># React + Vite frontend</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="dir">└── src/</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="dir">├── pages/</span> <span class="note"># Dashboard, Quiz, Summary, Chatbot</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="dir">└── components/</span> <span class="note"># Layout, UI components</span><br>
    &nbsp;&nbsp;<span class="dir">└── api-server/</span> <span class="note"># Express API server</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="dir">└── src/routes/</span> <span class="note"># quizzes, summaries, chatbot</span><br>
    <span class="dir">├── lib/</span><br>
    &nbsp;&nbsp;<span class="dir">├── db/</span> <span class="note"># Drizzle ORM schema + DB connection</span><br>
    &nbsp;&nbsp;<span class="dir">├── api-spec/</span> <span class="note"># OpenAPI spec + Orval codegen</span><br>
    &nbsp;&nbsp;<span class="dir">├── api-client-react/</span> <span class="note"># Generated React Query hooks</span><br>
    &nbsp;&nbsp;<span class="dir">└── api-zod/</span> <span class="note"># Generated Zod schemas</span><br>
    pnpm-workspace.yaml
  </div>

  <h2><span class="icon">&#128200;</span> Database Schema</h2>
  <ul class="schema-list">
    <li><strong>quizzes</strong>Quiz metadata — topic, difficulty, question count</li>
    <li><strong>quiz_questions</strong>Questions with options, correct index, explanation</li>
    <li><strong>summaries</strong>Topic, input text, AI summary, key points (JSON)</li>
    <li><strong>chat_conversations</strong>Chatbot threads organized by subject</li>
    <li><strong>chat_messages</strong>Individual messages per conversation</li>
  </ul>

  <h2><span class="icon">&#128257;</span> API Endpoints</h2>
  <table>
    <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/quizzes</code></td><td>List all quizzes</td></tr>
      <tr><td><span class="method method-post">POST</span></td><td><code>/api/quizzes</code></td><td>Generate a new AI quiz</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/quizzes/stats</code></td><td>Quiz stats by topic and difficulty</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/quizzes/:id</code></td><td>Get quiz with questions</td></tr>
      <tr><td><span class="method method-del">DELETE</span></td><td><code>/api/quizzes/:id</code></td><td>Delete a quiz</td></tr>
      <tr><td><span class="method method-post">POST</span></td><td><code>/api/quizzes/:id/submit</code></td><td>Submit answers and get results</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/summaries</code></td><td>List all summaries</td></tr>
      <tr><td><span class="method method-post">POST</span></td><td><code>/api/summaries</code></td><td>Generate a new AI summary</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/summaries/:id</code></td><td>Get a summary</td></tr>
      <tr><td><span class="method method-del">DELETE</span></td><td><code>/api/summaries/:id</code></td><td>Delete a summary</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/chatbot/conversations</code></td><td>List all conversations</td></tr>
      <tr><td><span class="method method-post">POST</span></td><td><code>/api/chatbot/conversations</code></td><td>Create a conversation</td></tr>
      <tr><td><span class="method method-get">GET</span></td><td><code>/api/chatbot/conversations/:id</code></td><td>Get conversation with messages</td></tr>
      <tr><td><span class="method method-del">DELETE</span></td><td><code>/api/chatbot/conversations/:id</code></td><td>Delete a conversation</td></tr>
      <tr><td><span class="method method-post">POST</span></td><td><code>/api/chatbot/conversations/:id/messages</code></td><td>Send message (SSE streaming)</td></tr>
    </tbody>
  </table>

  <h2><span class="icon">&#128640;</span> Getting Started</h2>

  <h3>Prerequisites</h3>
  <ul style="padding-left:20px; color:#94a3b8; font-size:14px; margin-bottom:16px;">
    <li>Node.js 20+</li>
    <li>pnpm</li>
    <li>PostgreSQL database (or use the Replit built-in database)</li>
  </ul>

  <h3>Installation</h3>
  <pre><code><span class="comment"># Install dependencies</span>
<span class="cmd">pnpm install</span>

<span class="comment"># Push database schema</span>
<span class="cmd">pnpm --filter @workspace/db run push</span></code></pre>

  <h3>Development</h3>
  <pre><code><span class="comment"># Start the API server</span>
<span class="cmd">pnpm --filter @workspace/api-server run dev</span>

<span class="comment"># Start the frontend (in a separate terminal)</span>
<span class="cmd">pnpm --filter @workspace/edu-ai run dev</span></code></pre>

  <h3>Environment Variables</h3>
  <div class="env-item">
    <code>DATABASE_URL</code>
    <p>PostgreSQL connection string</p>
  </div>
  <div class="env-item">
    <code>AI_INTEGRATIONS_OPENAI_BASE_URL</code>
    <p>OpenAI proxy URL (auto-configured by Replit)</p>
  </div>
  <div class="env-item">
    <code>AI_INTEGRATIONS_OPENAI_API_KEY</code>
    <p>OpenAI proxy API key (auto-configured by Replit)</p>
  </div>
  <div class="env-item">
    <code>PORT</code>
    <p>Port for the API server</p>
  </div>

  <h2><span class="icon">&#128220;</span> License</h2>
  <div class="license-box">
    <div class="license-icon">&#9878;&#65039;</div>
    <div>
      <strong>MIT License</strong>
      <p>Free to use, modify, and distribute.</p>
    </div>
  </div>

  <footer>
    AI Study Smart Platform &mdash; Powered by GPT-5.2 &mdash;
    <a href="https://quiz-bot-tutor--saiganesh1430.replit.app" style="color:#6366f1;">quiz-bot-tutor--saiganesh1430.replit.app</a>
  </footer>

</div>
</body>
</html>
