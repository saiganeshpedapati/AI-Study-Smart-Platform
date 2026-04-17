import { Router } from "express";
import healthRouter from "./health";
import openaiRouter from "./openai";
import quizzesRouter from "./quizzes";
import summariesRouter from "./summaries";
import chatbotRouter from "./chatbot";

const router = Router();
router.use(healthRouter);
router.use("/openai", openaiRouter);
router.use("/quizzes", quizzesRouter);
router.use("/summaries", summariesRouter);
router.use("/chatbot", chatbotRouter);
export default router;