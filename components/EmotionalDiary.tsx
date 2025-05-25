"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import { MOOD_LANDSCAPES, INSPIRATION_PROMPTS } from "@/lib/constants";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function EmotionalDiary() {
  const [diaryEntry, setDiaryEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState(INSPIRATION_PROMPTS[0]);
  const router = useRouter();

  function getRandomImage() {
    const moodObj = MOOD_LANDSCAPES[Math.floor(Math.random() * MOOD_LANDSCAPES.length)];
    const shuffled = [...moodObj.images].sort(() => 0.5 - Math.random());
    return { image: shuffled[0], mood: moodObj.mood };
  }

  function getNewPrompt() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * INSPIRATION_PROMPTS.length);
    } while (INSPIRATION_PROMPTS[newIndex] === currentPrompt);
    setCurrentPrompt(INSPIRATION_PROMPTS[newIndex]);
  }

  const handleSave = (shouldGenerate: boolean = false) => {
    if (!diaryEntry.trim()) return;
    setIsSaving(true);
    let newEntry;
    if (shouldGenerate) {
      const { image, mood } = getRandomImage();
      newEntry = {
        id: uuidv4(),
        content: diaryEntry,
        type: "diary",
        createdAt: new Date().toISOString(),
        images: [image],
        mood,
      };
      setGeneratedImage(image);
    } else {
      newEntry = {
        id: uuidv4(),
        content: diaryEntry,
        type: "diary",
        createdAt: new Date().toISOString(),
      };
    }
    const prev = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
    localStorage.setItem('sumi-diary-entries', JSON.stringify([newEntry, ...prev]));
    setDiaryEntry("");
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      if (shouldGenerate) {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setShowDialog(true);
        }, 1000);
      }
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="diary" className="w-full max-w-3xl mx-auto py-8 px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-gray-800 dark:text-gray-100 mb-6 font-medium">
        Today's Reflections
      </h2>
      
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-1 transition-all duration-300 hover:shadow-md">
        <textarea
          value={diaryEntry}
          onChange={(e) => setDiaryEntry(e.target.value)}
          placeholder={currentPrompt}
          className={cn(
            "w-full min-h-[200px] p-4 resize-y bg-transparent",
            "font-sans text-gray-700 dark:text-gray-200",
            "focus:outline-none focus:ring-0",
            "placeholder:text-gray-600 dark:placeholder:text-gray-400",
            "transition-all duration-300"
          )}
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          {showSuccess && (
            <span className="text-green-600 dark:text-green-400 font-sans text-sm animate-in fade-in slide-in-from-right-5 duration-300">
              Saved successfully
            </span>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={() => handleSave()}
              disabled={isSaving || !diaryEntry.trim()}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
                "border border-gray-200 dark:border-gray-700",
                "shadow-sm transition-all duration-300",
                "opacity-90 hover:opacity-100",
                !diaryEntry.trim() && "opacity-40"
              )}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
              ) : (
                <Save className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
              <span className="ml-2">Save</span>
            </Button>

            <Button 
              onClick={() => handleSave(true)}
              disabled={isSaving || isGenerating || !diaryEntry.trim()}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full bg-[#A67C52] hover:bg-[#8A6642] text-white",
                "border border-[#A67C52] hover:border-[#8A6642]",
                "shadow-sm transition-all duration-300",
                "opacity-90 hover:opacity-100",
                !diaryEntry.trim() && "opacity-40"
              )}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span className="ml-2">Save & Generate Gallery</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center gap-4">
            <span className="font-serif text-lg">生成的灵感图片</span>
            {generatedImage && (
              <img src={generatedImage} alt="Generated" className="rounded-lg w-full object-cover" style={{maxHeight: 320}} />
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              onClick={getNewPrompt}
            >Inspire Me</button>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                onClick={() => {
                  const newEntry = {
                    id: uuidv4(),
                    content: diaryEntry,
                    type: "diary",
                    createdAt: new Date().toISOString(),
                  };
                  const prev = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
                  localStorage.setItem('sumi-diary-entries', JSON.stringify([newEntry, ...prev]));
                  setShowDialog(false);
                  setDiaryEntry("");
                  router.push("/");
                }}
              >Save</button>
              <button
                className="px-4 py-2 rounded bg-[#A67C52] text-white hover:bg-[#8A6642] transition"
                onClick={() => {
                  const newEntry = {
                    id: uuidv4(),
                    content: diaryEntry,
                    type: "diary",
                    createdAt: new Date().toISOString(),
                    images: [generatedImage],
                  };
                  const prev = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
                  localStorage.setItem('sumi-diary-entries', JSON.stringify([newEntry, ...prev]));
                  setShowDialog(false);
                  setDiaryEntry("");
                  router.push("/gallery");
                }}
              >Save & Generate Pic</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}