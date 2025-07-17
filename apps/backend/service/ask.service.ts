import type { Request, Response } from "express";
import { geminiResponse } from "../ai-core/gemini";

export const ask = async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return;
  }
  console.log("iwujsehdfdcbniwerufbhriweufhuiw");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // For Nginx or proxies
  res.flushHeaders?.();
  console.log("in ask");

  try {
    for await (const chunk of geminiResponse(question)) {
      res.write(
        `data: ${JSON.stringify({ response: chunk, streaming: "yes" })}\n\n`,
      );
    }
    res.write(`data: ${JSON.stringify({ streaming: "no" })}\n\n`);
    res.end();
  } catch (error) {
    res.write("some error");
    res.end();
  }
};
