"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Loader2, Heart, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmotionAnalysisResult {
  emotion: string;
  intensity: number;
  analysis: string;
  suggestions: string;
}

interface AnalysisResponse {
  success: boolean;
  result: EmotionAnalysisResult;
  originalText: string;
  error?: string;
}

export default function EmotionTestPage() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmotionAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("请输入要分析的文本");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/emotion-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data: AnalysisResponse = await response.json();

      if (data.success && data.result) {
        setResult(data.result);
      } else {
        setError(data.error || '分析失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查连接后重试');
      console.error('分析错误:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      '快乐': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      '悲伤': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      '愤怒': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      '恐惧': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      '惊讶': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      '厌恶': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      '平静': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    
    return emotionColors[emotion] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-green-500';
    if (intensity <= 6) return 'bg-yellow-500';
    if (intensity <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-[#A67C52]" />
            <h1 className="font-serif text-3xl md:text-4xl text-gray-800 dark:text-gray-100">
              情绪分析测试
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过AI技术分析您的文字，了解其中蕴含的情绪状态，获得专业的心理建议
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#A67C52]" />
                输入您的文字
              </CardTitle>
              <CardDescription>
                请输入您想要分析的文字内容，可以是日记、想法、感受等
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="在这里输入您的文字内容..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
                disabled={isAnalyzing}
              />
              
              {error && (
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full bg-[#A67C52] hover:bg-[#8A6642] text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    开始分析
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 结果区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#A67C52]" />
                分析结果
              </CardTitle>
              <CardDescription>
                AI为您提供的情绪分析和建议
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* 主要情绪 */}
                  <div>
                    <h3 className="font-medium mb-2">主要情绪</h3>
                    <Badge className={cn("text-sm px-3 py-1", getEmotionColor(result.emotion))}>
                      {result.emotion}
                    </Badge>
                  </div>

                  {/* 情绪强度 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">情绪强度</h3>
                      <span className="text-sm text-gray-500">{result.intensity}/10</span>
                    </div>
                    <Progress 
                      value={result.intensity * 10} 
                      className="h-2"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      {result.intensity <= 3 && "轻微"}
                      {result.intensity > 3 && result.intensity <= 6 && "中等"}
                      {result.intensity > 6 && result.intensity <= 8 && "较强"}
                      {result.intensity > 8 && "强烈"}
                    </div>
                  </div>

                  {/* 详细分析 */}
                  <div>
                    <h3 className="font-medium mb-2">详细分析</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {result.analysis}
                    </p>
                  </div>

                  {/* 建议 */}
                  <div>
                    <h3 className="font-medium mb-2">心理建议</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                        {result.suggestions}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>输入文字并点击分析按钮，获取情绪分析结果</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A67C52] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h4 className="font-medium mb-1">输入文字</h4>
                  <p className="text-gray-600 dark:text-gray-300">在左侧文本框中输入您想要分析的内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A67C52] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h4 className="font-medium mb-1">AI分析</h4>
                  <p className="text-gray-600 dark:text-gray-300">点击分析按钮，AI将识别文字中的情绪</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A67C52] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h4 className="font-medium mb-1">获得建议</h4>
                  <p className="text-gray-600 dark:text-gray-300">查看分析结果和专业的心理建议</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </main>
  );
} 