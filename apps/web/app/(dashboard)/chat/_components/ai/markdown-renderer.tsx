/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import mermaid from "mermaid";
import React, { useEffect, useRef, useState as useComponentState } from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Props = {
  data: string;
};

// Helper function to check if a specific mermaid code block is complete
const isMermaidCodeBlockComplete = (
  data: string,
  currentChart: string
): boolean => {
  // Find the position of the current chart in the data
  const chartIndex = data.indexOf(currentChart);
  if (chartIndex === -1) return false;

  // Look for the opening ```mermaid before this chart
  const beforeChart = data.substring(0, chartIndex);
  const mermaidStart = beforeChart.lastIndexOf("```mermaid");
  if (mermaidStart === -1) return false;

  // Look for the closing ``` after this chart
  const afterChartStart = chartIndex + currentChart.length;
  const afterChart = data.substring(afterChartStart);
  const mermaidEnd = afterChart.indexOf("```");

  // If we found both opening and closing markers, the block is complete
  return mermaidEnd !== -1;
};

// Mermaid component to render diagrams with debounced rendering and error handling
const MermaidDiagram = ({ chart, data }: { chart: string; data: string }) => {
  console.log("chart:", chart);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const [hasError, setHasError] = useComponentState(false);
  const [copied, setCopied] = useComponentState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (elementRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (elementRef.current) {
          // start mermaid
          mermaid.initialize({
            startOnLoad: true,
            theme: "neutral",
            securityLevel: "loose",
            suppressErrorRendering: true,
          });
          mermaid.contentLoaded();
          // Generate unique ID for the diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

          mermaid
            .render(id, chart)
            .then(({ svg }) => {
              if (elementRef.current) {
                elementRef.current.innerHTML = svg;
                setHasError(false);
              }
            })
            .catch((error) => {
              console.error("Mermaid rendering error:", error);
              setHasError(true);
            });
        }
      }, 1500);
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [chart]);
  console.log("has error?", hasError);
  // If there's an error, display as a normal code block
  if (hasError) {
    return (
      <div className="relative mb-3">
        <div className="flex items-center justify-between bg-[#1e1e1e] text-accent-foreground px-4 py-2 text-xs rounded-t-md ">
          <span>mermaid</span>
          <CopyToClipboard text={chart} onCopy={handleCopy}>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs hover:bg-gray-700"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </CopyToClipboard>
        </div>

        <SyntaxHighlighter
          style={vscDarkPlus}
          language="mermaid"
          PreTag="div"
          className="rounded-b-md rounded-t-none !m-0"
        >
          {chart}
        </SyntaxHighlighter>
      </div>
    );
  }

  return <div ref={elementRef} className="my-4" />;
};

const MarkdownRenderer = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markdownComponents: Components = {
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-primary" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-4xl font-bold mt-5 mb-3 text-primary " {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-primary" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="text-accent-foreground mb-4 leading-relaxed" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 mb-4 text-accent-foreground" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal pl-6 mb-4 text-accent-foreground"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-muted pl-4 italic text-accent-foreground my-4"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      // Convert children into a plain string
      const codeString = Array.isArray(children)
        ? children
            .map((child) => (typeof child === "string" ? child : ""))
            .join("")
        : typeof children === "string"
          ? children
          : "";

      if (match && match[1] === "mermaid") {
        const currentChart = codeString.replace(/\n$/, "");
        const shouldRenderMermaid = isMermaidCodeBlockComplete(
          data,
          currentChart
        );

        return shouldRenderMermaid ? (
          <MermaidDiagram chart={currentChart} data={data} />
        ) : (
          <div className="text-primary">Loading diagram...</div>
        );
      }

      // Regular code block with syntax highlighting
      return match ? (
        <div className="relative mb-3">
          <div className="flex items-center justify-between bg-[#1e1e1e] text-accent-foreground px-4 py-2 text-xs rounded-t-md ">
            <span>{match[1]}</span>
            <CopyToClipboard
              text={codeString.replace(/\n$/, "")}
              onCopy={handleCopy}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-gray-700"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </CopyToClipboard>
          </div>

          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-b-md rounded-t-none !m-0"
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          {...props}
          className="bg-accent rounded px-1 py-0.5 text-sm font-mono"
        >
          {codeString}
        </code>
      );
    },
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse my-4" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
    th: ({ node, ...props }) => (
      <th className="px-4 py-2 text-left border-b border-border" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-2 border-b border-border" {...props} />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-6 border-border" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="mt-5 mb-5 text-primary" {...props} />
    ),
  };

  return (
    <>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={markdownComponents}
      >
        {data}
      </Markdown>
      <div className="flex justify-end items-center">
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
    </>
  );
};

export default MarkdownRenderer;
