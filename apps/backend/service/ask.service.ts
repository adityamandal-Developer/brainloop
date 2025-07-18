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
        `data: ${JSON.stringify({ response: chunk, streaming: "yes" })}\n\n`
      );
    }
    res.write(`data: ${JSON.stringify({ streaming: "no" })}\n\n`);
    res.end();
  } catch (error) {
    res.write("some error");
    res.end();
  }
};

export const askcheck = async (req: Request, res: Response) => {
  try {
    console.log("Ask-check endpoint hit with body:", req.body);
    console.log("Request headers:", req.headers);
    console.log("Request method:", req.method);

    const { question } = req.body;
    if (!question) {
      res.status(400).send({ error: "Question is required" });
      return;
    }

    console.log("Sending response for question:", question);

    const response = {
      question: question,
      message: "This is a test response",
      timestamp: new Date().toISOString(),
    };

    res.send({ response });
  } catch (error) {
    console.error("Error in askcheck endpoint:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
