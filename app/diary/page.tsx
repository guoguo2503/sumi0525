"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOOD_LANDSCAPES } from "@/lib/constants";
import Image from "next/image";

// Mock data structure for diary entries
interface DiaryEntry {
  id: string;
  content: string;
  type: "diary" | "inspiration";
  createdAt: string;
  mood?: "peaceful" | "melancholic" | "energetic" | "mysterious" | "hopeful";
  images?: string[];
}

// Mock diary entries with moods and images
const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    content: "Today I felt like a cloud drifting through an endless sky. The world below seemed so small, yet so intricate in its details.",
    type: "diary",
    createdAt: "2024-03-20T14:30:00Z",
    mood: "peaceful",
    images: MOOD_LANDSCAPES.find(m => m.mood === "peaceful")?.images.slice(0, 2)
  },
  {
    id: "2",
    content: "If you could write a letter to yesterday's self, what would you say?",
    type: "inspiration",
    createdAt: "2024-03-19T10:15:00Z"
  },
  {
    id: "3",
    content: "The strangest dream visited me last night - I was walking through a garden where all the flowers were made of stained glass.",
    type: "diary",
    createdAt: "2024-03-18T20:45:00Z",
    mood: "mysterious",
    images: MOOD_LANDSCAPES.find(m => m.mood === "mysterious")?.images.slice(0, 2)
  },
  {
    id: "4",
    content: "Despite the rain today, I found unexpected beauty in the way droplets created tiny prisms on my window.",
    type: "diary",
    createdAt: "2024-03-17T09:20:00Z",
    mood: "melancholic",
    images: MOOD_LANDSCAPES.find(m => m.mood === "melancholic")?.images.slice(0, 2)
  },
  {
    id: "5",
    content: "The sunrise this morning painted the sky in colors I've never seen before. It felt like a new beginning.",
    type: "diary",
    createdAt: "2024-03-16T08:15:00Z",
    mood: "hopeful",
    images: MOOD_LANDSCAPES.find(m => m.mood === "hopeful")?.images.slice(0, 2)
  }
];

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const localEntries = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
    setEntries([...localEntries, ...mockDiaryEntries]);
  }, []);

  const handleDelete = (id: string) => {
    setEntries(prev => {
      const updated = prev.filter(entry => entry.id !== id);
      // 同步localStorage
      localStorage.setItem('sumi-diary-entries', JSON.stringify(updated.filter(e => e.type === 'diary')));
      return updated;
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <h1 className="font-serif text-3xl md:text-4xl text-gray-800 dark:text-gray-100 mb-12 text-center">
          My Journey
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {entries
              .filter((_, index) => index % 2 === 0)
              .map(entry => (
                <DiaryCard 
                  key={entry.id}
                  entry={entry}
                  onDelete={() => handleDelete(entry.id)}
                />
              ))}
          </div>
          
          {/* Right Column */}
          <div className="space-y-6 md:mt-12">
            {entries
              .filter((_, index) => index % 2 === 1)
              .map(entry => (
                <DiaryCard 
                  key={entry.id}
                  entry={entry}
                  onDelete={() => handleDelete(entry.id)}
                />
              ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

function DiaryCard({ entry, onDelete }: { entry: DiaryEntry; onDelete: () => void }) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 rounded-lg shadow-sm",
        "border border-gray-100 dark:border-gray-800",
        "p-6 transition-all duration-300 hover:shadow-md",
        "relative group"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </time>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          aria-label="Delete entry"
        >
          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400" />
        </button>
      </div>
      
      <div className="space-y-4">
        <p className={cn(
          "text-gray-700 dark:text-gray-200 leading-relaxed",
          entry.type === "inspiration" && "font-serif italic"
        )}>
          {entry.content}
        </p>
        
        {entry.images && entry.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {entry.images.map((image, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt={`Mood landscape ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            entry.type === "diary" 
              ? "bg-[#A67C52]/10 text-[#A67C52] dark:bg-[#A67C52]/20 dark:text-[#A67C52]"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          )}>
            {entry.type === "diary" ? "Diary Entry" : "Inspiration Prompt"}
          </span>
          {entry.mood && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}