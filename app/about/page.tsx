"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* 头像和名称 */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-gray-800 dark:text-gray-100 mb-4 font-medium">
              Sumi
            </h1>
          </div>

          {/* 介绍内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-6 font-medium">
              关于 诉秘 (Sumi)
            </h2>
            
            <p className="font-serif text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed italic text-center">
              诉秘 (Sumi): 你书写，我看见，我们治愈。
            </p>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="font-sans text-lg">
                在快节奏的现代生活中，我们常常被各种情绪包围，却鲜有空间能真正地倾听和表达。
              </p>
              <p className="font-sans text-lg">
                诉秘 (Sumi) 的诞生，正是为了为您提供这样一个专属的港湾。
              </p>
              <p className="font-sans text-lg">
                我们深信，书写是连接自我的最直接方式，也是疗愈的开始。
              </p>
              
              <p className="font-sans text-lg mt-8">
                "Sumi"这个名字结合了拉丁文 <span className="font-medium">sum-</span> (意为"存在"，灵感源自笛卡尔"我思故我在"的哲学思考) 和日语 <span className="font-medium">mi</span> (意为"书写")。中文的【诉秘】则是希望在这里，您的所有情绪，都会被稳稳接住。
              </p>
              
              <div className="mt-10">
                <h3 className="font-serif text-xl text-gray-800 dark:text-gray-100 mb-6 font-medium">
                  在诉秘，您可以：
                </h3>
                
                <div className="space-y-4 ml-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">自由倾诉：</span>
                      <span className="ml-2">记录您的日常感悟、内心波澜或任何思绪。</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">激发灵感：</span>
                      <span className="ml-2">当不知从何说起时，我们的灵感随想会为您开启新的视角。</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">创造艺术：</span>
                      <span className="ml-2">您的文字将转化成独一无二的情绪画廊，让您的内心世界以视觉的方式被"看见"。</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="font-sans text-lg mt-8">
                我们愿景很简单：通过这份结合了书写、灵感与艺术的体验，帮助您找到一份专属的宁静与疗愈，重新拾起前行的力量。
              </p>
              
              <p className="font-serif text-lg mt-8 text-gray-700 dark:text-gray-200 italic">
                来吧，开始您的书写之旅。在这里，您的心绪将得到安放，您的故事将化为诗篇。
              </p>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300">
              <Mail className="h-5 w-5" />
              <a 
                href="mailto:jenniferfruit@outlook.com"
                className="font-sans text-lg hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
              >
                jenniferfruit@outlook.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 