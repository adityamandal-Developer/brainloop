"use client";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import PromptInput from "./ai/prompt-Input";
import LoadingResponse from "./ai/loading";
import { useMutation } from "@tanstack/react-query";
import { GradientText } from "./ai/gradient";
import { fetchDataInChunks } from "@/lib/actions/getResponse";
import MarkdownRenderer from "./ai/markdown-renderer";

export default function Chat() {
  const [data, setData] = useState("");
  const [generaring, setGenerating] = useState(false);

  const mutation = useMutation({
    mutationFn: fetchDataInChunks,
    onSuccess: async (responseBody) => {
      const reader = responseBody.getReader();
      const decoder = new TextDecoder();
      let receivedData = "";

      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;

        receivedData += decoder.decode(chunk, { stream: true });
        const lines = receivedData.split("\n");

        // Preserve incomplete line for next iteration
        receivedData = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim().startsWith("data:")) continue;

          const jsonStr = line.replace(/^data:\s*/, "");
          try {
            const parsed = JSON.parse(jsonStr);

            if (parsed.response) {
              setGenerating(false);
              setData((prev) => prev + parsed.response);
            }
          } catch (err) {
            console.error("Error parsing streamed JSON:", err);
          }
        }
      }
    },
    onError: (error) => {
      setGenerating(false);
      console.error("Error fetching data:", error);
    },
  });

  const handleSubmit = (input: string) => {
    if (!input.trim()) return;

    setData("");

    setGenerating(true);
    mutation.mutate(input);
  };

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);

    return () => clearTimeout(timeout);
  }, [data]);

  console.log(data);
  return (
    <div
      className={`flex flex-col items-center justify-center w-full sm:py-8 ${!data && "h-screen"}`}
    >
      <div className="md:max-w-4xl w-full mx-auto sm:px-4 md:px-10">
        <Card className="border-none bg-background shadow-none">
          <CardContent className="sm:p-6">
            {data ? (
              <MarkdownRenderer data={data} />
            ) : generaring ? (
              <LoadingResponse />
            ) : (
              <h1 className="flex flex-col gap-2 justify-center items-left text-3xl">
                <GradientText
                  className="text-6xl font-semibold"
                  text="Hey Aditya"
                />
                <GradientText
                  className="text-3xl"
                  text="What are you up to today?"
                />
              </h1>
            )}
          </CardContent>
        </Card>
      </div>
      <div
        className="sticky bottom-0 w-full sm:p-4 rounded-3xl z-10 transition-all p-1"
        ref={endRef}
      >
        <PromptInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
