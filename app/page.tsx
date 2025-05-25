"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from '@/components/Header';
import { InspirationModule } from '@/components/InspirationModule';
import { Footer } from '@/components/Footer';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { MOOD_LANDSCAPES } from "@/lib/constants";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [savedText, setSavedText] = useState("");
  const router = useRouter();

  function getRandomImage() {
    const moodObj = MOOD_LANDSCAPES[Math.floor(Math.random() * MOOD_LANDSCAPES.length)];
    const shuffled = [...moodObj.images].sort(() => 0.5 - Math.random());
    return { image: shuffled[0], mood: moodObj.mood };
  }

  const handleSave = (text: string) => {
    if (!text.trim()) return;
    const newEntry = {
      id: uuidv4(),
      content: text,
      type: "inspiration",
      createdAt: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
    localStorage.setItem('sumi-diary-entries', JSON.stringify([newEntry, ...prev]));
    router.push("/diary");
  };

  const handleSaveAndGenerate = (text: string) => {
    if (!text.trim()) return;
    const { image, mood } = getRandomImage();
    const newEntry = {
      id: uuidv4(),
      content: text,
      type: "inspiration",
      createdAt: new Date().toISOString(),
      images: [image],
      mood,
    };
    const prev = JSON.parse(localStorage.getItem('sumi-diary-entries') || '[]');
    localStorage.setItem('sumi-diary-entries', JSON.stringify([newEntry, ...prev]));
    setSavedText(text);
    setGeneratedImage(image);
    setShowDialog(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex items-center justify-center pt-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-medium text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Sumi <span className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl">诉秘</span>
          </h1>
          <div className="space-y-6">
            <p className="font-sans text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              书写，即是存在。源自拉丁文"存在"与日语"书写"的融合，我们邀请您在此安心倾诉。让灵感和艺术，成为您寻找平静与力量的旅程。
            </p>
            <p className="font-serif text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
              To write is to exist. Merging the Latin "sum-" (to exist) and the Japanese "mi" (to write), we invite you to confide in us. Let inspiration and art guide you on a journey to discover peace and strength.
            </p>
          </div>
          <div className="h-[1px] w-16 bg-gray-300 dark:bg-gray-700 mx-auto mt-8"></div>
        </div>
      </section>
      
      <InspirationModule 
        onSave={handleSave}
        onSaveAndGenerate={handleSaveAndGenerate}
      />
      <Footer />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center gap-4">
            <span className="font-serif text-lg">生成的灵感图片</span>
            {generatedImage && (
              <img src={generatedImage} alt="Generated" className="rounded-lg w-full object-cover" style={{maxHeight: 320}} />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              onClick={() => { setShowDialog(false); router.push("/"); }}
            >返回首页</button>
            <button
              className="px-4 py-2 rounded bg-[#A67C52] text-white hover:bg-[#8A6642] transition"
              onClick={() => { setShowDialog(false); router.push("/gallery"); }}
            >前往画廊</button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}