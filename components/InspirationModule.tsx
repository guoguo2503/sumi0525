"use client";

import { useRandomPrompt } from "@/lib/hooks/useRandomPrompt";
import { Button } from "@/components/ui/button";
import { Sparkles, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export function InspirationModule({ onSave, onSaveAndGenerate }: { onSave?: (text: string) => void, onSaveAndGenerate?: (text: string) => void }) {
  const { currentPrompt, isTransitioning, getNewPrompt } = useRandomPrompt();
  const [userPrompt, setUserPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="w-full max-w-3xl mx-auto py-8 px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-gray-800 dark:text-gray-100 mb-6 font-medium">
        Today's Emotion Diary
      </h2>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-all duration-300">
        <div className="min-h-[120px] flex items-center justify-center mb-6">
          <textarea
            ref={textareaRef}
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
            placeholder={currentPrompt}
            className={cn(
              "w-full bg-transparent border-none resize-none text-center font-serif text-xl italic",
              "text-gray-700 focus:text-gray-900 dark:text-gray-400 dark:focus:text-gray-100",
              "placeholder-gray-500 focus:outline-none transition-colors duration-300"
            )}
            rows={2}
            spellCheck={false}
          />
        </div>
        <div className="flex justify-between items-end mt-8">
          <Button 
            onClick={getNewPrompt}
            className={cn(
              "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700",
              "shadow-sm transition-all duration-300 rounded-md px-6 flex items-center gap-2"
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span>Inspire Me</span>
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => onSave?.(userPrompt)}
              disabled={!userPrompt.trim()}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
                "border border-gray-200 dark:border-gray-700",
                "shadow-sm transition-all duration-300",
                "opacity-90 hover:opacity-100",
                !userPrompt.trim() && "opacity-40"
              )}
            >
              <Save className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="ml-2">Save</span>
            </Button>
            <Button
              onClick={() => onSaveAndGenerate?.(userPrompt)}
              disabled={!userPrompt.trim()}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full bg-[#A67C52] hover:bg-[#8A6642] text-white",
                "border border-[#A67C52] hover:border-[#8A6642]",
                "shadow-sm transition-all duration-300",
                "opacity-90 hover:opacity-100",
                !userPrompt.trim() && "opacity-40"
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span className="ml-2">Save & Generate Gallery</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}