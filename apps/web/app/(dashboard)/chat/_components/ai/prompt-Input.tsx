"use client";
import { ArrowRight, Bot, Check, ChevronDown, Paperclip } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { AI_MODELS, MODEL_ICONS } from "@/lib/constaints";

export default function PromptInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 300,
  });
  const [selectedModel, setSelectedModel] = useState("Auto");
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
      setValue("");
      adjustHeight(true);
    }
  };
  return (
    <div className="w-full mx-auto rounded-3xl bg-background">
      <div className="relative flex flex-col">
        <div className="w-full" style={{ maxHeight: "400px" }}>
          <form
            className="w-full"
            id="send-prompt"
            onSubmit={(e) => {
              e.preventDefault();
              if (!value.trim()) return;
              onSubmit(value);
              setValue("");
              adjustHeight(true);
            }}
          >
            <Textarea
              id="ai-input"
              value={value}
              placeholder={"What can I do for you?"}
              className={cn(
                "w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[95vw] sm:min-w-[50vw]"
              )}
              ref={textareaRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
            />
          </form>
        </div>

        <div className="h-14 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center">
          <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 h-8 pl-1 pr-2 text-xs rounded-md dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedModel}
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 5,
                        }}
                        transition={{
                          duration: 0.15,
                        }}
                        className="flex items-center gap-1"
                      >
                        {MODEL_ICONS[selectedModel]}
                        {selectedModel}
                        <ChevronDown className="w-3 h-3 opacity-50" />
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={cn(
                    "min-w-[10rem]",
                    "border-black/10 dark:border-white/10",
                    "bg-gradient-to-b from-white via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800"
                  )}
                >
                  {AI_MODELS.map((model) => (
                    <DropdownMenuItem
                      key={model}
                      onSelect={() => setSelectedModel(model)}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        {MODEL_ICONS[model] || (
                          <Bot className="w-4 h-4 opacity-50" />
                        )}{" "}
                        {/* Use mapped SVG or fallback */}
                        <span>{model}</span>
                      </div>
                      {selectedModel === model && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
              <label
                className={cn(
                  "rounded-lg p-2 bg-black/5 dark:bg-white/5 cursor-pointer",
                  "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                  "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
                aria-label="Attach file"
              >
                <input type="file" className="hidden" />
                <Paperclip className="w-4 h-4 transition-colors" />
              </label>
            </div>
            <button
              type="submit"
              form="send-prompt"
              className={cn(
                "rounded-lg p-2 bg-black/5 dark:bg-white/5",
                "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
              )}
              aria-label="Send message"
              disabled={!value.trim()}
            >
              <ArrowRight
                className={cn(
                  "w-4 h-4 dark:text-white transition-opacity duration-200",
                  value.trim() ? "opacity-100" : "opacity-30"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
