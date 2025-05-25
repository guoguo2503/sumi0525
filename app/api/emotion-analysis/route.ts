import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入要分析的文本' },
        { status: 400 }
      );
    }

    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-oariswevridlwzcjivzjumcxfpdotxulxlxuipoagahobohy',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-VL-72B-Instruct",
        messages: [
          {
            role: "system",
            content: "你是一个专业的情绪分析师。请分析用户输入的文本，识别其中的情绪状态。请用JSON格式回复，包含以下字段：emotion（主要情绪，如：快乐、悲伤、愤怒、恐惧、惊讶、厌恶、平静等）、intensity（情绪强度，1-10分）、analysis（详细分析，100字以内）、suggestions（建议，100字以内）。请用中文回复。"
          },
          {
            role: "user",
            content: `请分析以下文本的情绪：\n\n${text}`
          }
        ],
        stream: false,
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1,
        response_format: { type: "text" }
      })
    };

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API响应格式错误');
    }

    const analysisText = data.choices[0].message.content;
    
    // 尝试解析JSON响应，如果失败则提供默认格式
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisText);
    } catch (e) {
      // 如果AI没有返回标准JSON，我们手动构造一个结果
      analysisResult = {
        emotion: "复杂情绪",
        intensity: 5,
        analysis: analysisText.substring(0, 100),
        suggestions: "建议多关注自己的内心感受，适当表达情绪。"
      };
    }

    return NextResponse.json({
      success: true,
      result: analysisResult,
      originalText: text
    });

  } catch (error) {
    console.error('情绪分析API错误:', error);
    return NextResponse.json(
      { 
        error: '情绪分析失败，请稍后重试',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 