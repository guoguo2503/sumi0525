"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MOOD_LANDSCAPES } from "@/lib/constants";

export function EmotionGallery() {
  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto py-16 px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-gray-800 dark:text-gray-100 mb-12 text-center font-medium">
        Your Emotion Gallery
      </h2>
      
      <div className="space-y-16">
        {MOOD_LANDSCAPES.map((moodCategory) => (
          <div key={moodCategory.mood} className="space-y-6">
            {/* 情绪标题 */}
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-2 capitalize">
                —— {moodCategory.mood} ——
              </h3>
              <div className="h-[1px] w-24 bg-gray-300 dark:bg-gray-600 mx-auto"></div>
            </div>
            
            {/* 图片网格 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {moodCategory.images.slice(0, 10).map((image, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative aspect-[3/4] group cursor-pointer",
                    "overflow-hidden rounded-lg",
                    "transition-transform duration-300 hover:scale-[1.02]"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${moodCategory.mood} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button 
          variant="outline"
          className={cn(
            "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
            "hover:bg-white dark:hover:bg-gray-900",
            "text-gray-900 dark:text-gray-100",
            "border-gray-200 dark:border-gray-800",
            "shadow-sm"
          )}
        >
          View More
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}