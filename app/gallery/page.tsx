"use client";

import { Header } from '@/components/Header';
import { EmotionGallery } from '@/components/EmotionGallery';
import { Footer } from '@/components/Footer';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased">
      <Header />
      <div className="pt-20">
        <EmotionGallery />
      </div>
      <Footer />
    </main>
  );
}