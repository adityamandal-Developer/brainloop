"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import AI_Prompt from "@/components/ai/input-selector";
import AITextLoading from "@/components/ai/loading";
import MarkdownRenderer from "@/components/ai/markdown-renderer";
import { useMutation } from "@tanstack/react-query";
import { GradientText } from "@/components/animate-ui/text/gradient";
import { fetchDataInChunks } from "@/lib/fetchAidata";

export default function Home() {
  const [data, setData] = useState("");
  const [generaring, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState("");

  const mutation = useMutation({
    mutationFn: fetchDataInChunks,
    onSuccess: async (responseBody) => {
      const reader = responseBody.getReader();
      const decoder = new TextDecoder();
      let receivedData = "";

      while (true) {
        setGenerating(false);
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

  const handleSubmit = () => {
    if (!value.trim()) return;

    setData("");

    setGenerating(true);
    mutation.mutate(value);
  };

  const endRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const timeout = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);

    return () => clearTimeout(timeout);
  }, [data]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.log(data);
  console.log(value);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8">
      <div className="md:max-w-4xl w-full mx-auto px-4">
        <Card className="border-none bg-background shadow-none">
          <CardHeader className="">
            <div className="flex justify-between items-center">
              {data && (
                <CopyToClipboard text={data} onCopy={handleCopy}>
                  <Button variant="ghost" size="sm">
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </CopyToClipboard>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {data ? (
              <MarkdownRenderer data={data} />
            ) : generaring ? (
              <AITextLoading />
            ) : (
              <h1 className="flex justify-center items-center text-3xl">
                <GradientText
                  className="text-4xl font-bold"
                  text="What are you up to today?"
                />
              </h1>
            )}
          </CardContent>
        </Card>
      </div>
      <div
        className="flex justify-center items-center w-full mt-28"
        ref={endRef}
      >
        <AI_Prompt setValue={setValue} value={value} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
