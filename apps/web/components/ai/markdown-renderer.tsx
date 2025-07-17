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
import React, { useEffect, useRef } from "react";

type Props = {
  data: string;
};

// Helper function to check if Mermaid code block is complete
const isMermaidCodeBlockComplete = (data: string): boolean => {
  // Find all mermaid code blocks in the data
  const mermaidBlocks = data.match(/```mermaid[\s\S]*?```/g);
  if (!mermaidBlocks) return false;

  // Check if the last mermaid block is complete (ends with ```)
  const lastBlock = mermaidBlocks[mermaidBlocks.length - 1];
  if (!lastBlock) return false;
  return lastBlock.endsWith("```");
};

// Mermaid component to render diagrams with debounced rendering
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

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

          // Generate unique ID for the diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

          mermaid
            .render(id, chart)
            .then(({ svg }) => {
              if (elementRef.current) {
                elementRef.current.innerHTML = svg;
              }
            })
            .catch((error) => {
              console.error("Mermaid rendering error:", error);
              if (elementRef.current) {
                elementRef.current.innerHTML = `<div class="text-red-500">Error rendering diagram</div>`;
              }
            });
        }
      }, 2000);
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [chart]);

  return <div ref={elementRef} className="my-4" />;
};

const MarkdownRenderer = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shouldRenderMermaid = isMermaidCodeBlockComplete(data);
  console.log("Should render mermaid: - ", shouldRenderMermaid);
  const markdownComponents: Components = {
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-primary" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-4xl font-bold mt-5 mb-3 text-primary font-serif"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-xl font-semibold mt-4 mb-2 text-foreground"
        {...props}
      />
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

      // Check if it's a mermaid diagram and if it should be rendered
      if (match && match[1] === "mermaid") {
        return shouldRenderMermaid ? (
          <MermaidDiagram chart={String(children).replace(/\n$/, "")} />
        ) : (
          <div className="text-primary">Loading</div>
        );
      }

      // Regular code block with syntax highlighting
      return match ? (
        <div className="relative mb-3">
          <div className="flex items-center justify-between bg-[#1e1e1e] text-accent-foreground px-4 py-2 text-xs rounded-t-md ">
            <span>{match[1]}</span>
            <CopyToClipboard
              text={String(children).replace(/\n$/, "")}
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
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          {...props}
          className="bg-muted rounded px-1 py-0.5 text-sm font-mono"
        >
          {children}
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
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {data}
    </Markdown>
  );
};

export default MarkdownRenderer;
