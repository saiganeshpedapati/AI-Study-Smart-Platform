# 🚀 AI Study Smart Platform

An AI-powered educational platform that helps students learn smarter with AI-generated quizzes, summaries, and a real-time AI tutor chatbot.

🌐 **Live Demo:**
https://quiz-bot-tutor--fabganesh1430.replit.app


---

## ✨ Features

### 📝 Quiz Generator

* Enter any topic (Easy / Medium / Hard)
* Generate 5, 10, 15, or 20 MCQs instantly
* One-question-at-a-time interface with progress bar
* Get score with explanations
* Retake quizzes or view history

### 📄 Summary Generator

* Paste notes, articles, or chapters
* Get short AI-generated summaries
* Key bullet points extracted
* Saved for later review

### 🤖 AI Tutor Chatbot

* Subject-wise chat (like Calculus, Biology)
* Real-time responses
* Full conversation history

---

## 🛠 Tech Stack

* **Frontend:** React + Vite + TypeScript
* **Styling:** Tailwind CSS
* **Backend:** Express.js
* **Database:** PostgreSQL + Drizzle ORM
* **AI:** OpenAI (GPT-5.2)

---

## 📁 Project Structure

```
artifacts/
  ├── edu-ai/        # Frontend (React)
  ├── api-server/    # Backend (Express)

lib/
  ├── db/            # Database schema
  ├── api-client/    # API hooks
```

---

## 🚀 Getting Started

### Installation

```
pnpm install
pnpm --filter @workspace/db run push
```

### Run Project

```
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/edu-ai run dev
```

---

## 🔑 Environment Variables

* `DATABASE_URL` → PostgreSQL connection
* `AI_INTEGRATIONS_OPENAI_API_KEY` → OpenAI key
* `PORT` → Server port

---

## 📄 License

MIT License
