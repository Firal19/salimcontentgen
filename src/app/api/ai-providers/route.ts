import { NextRequest, NextResponse } from 'next/server'

const aiProviders = {
  text: [
    {
      id: "zai",
      name: "Z.ai",
      description: "Free tier available, integrated AI assistant",
      category: "Text Generation",
      pricing: "Free tier available",
      website: "https://z.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "prompt generation"]
    },
    {
      id: "openai",
      name: "OpenAI GPT",
      description: "Advanced language model for text generation",
      category: "Text Generation",
      pricing: "$0.01/1K tokens",
      website: "https://openai.com",
      requiresApiKey: true,
      isFree: false,
      costTier: "low-cost",
      capabilities: ["quote generation", "text analysis", "prompt generation", "content creation"]
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Constitutional AI for safe, helpful text generation",
      category: "Text Generation",
      pricing: "$0.015/1K tokens",
      website: "https://anthropic.com",
      requiresApiKey: true,
      isFree: false,
      costTier: "low-cost",
      capabilities: ["quote generation", "text analysis", "content creation"]
    },
    {
      id: "google",
      name: "Google Gemini",
      description: "Google's advanced AI model",
      category: "Text Generation",
      pricing: "Free tier available",
      website: "https://ai.google",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "content creation"]
    },
    {
      id: "cohere",
      name: "Cohere",
      description: "Large language model for enterprise applications",
      category: "Text Generation",
      pricing: "Free tier + $5/month",
      website: "https://cohere.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["quote generation", "text analysis", "content generation"]
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "Open-source models and datasets",
      category: "Text Generation",
      pricing: "Free open-source models",
      website: "https://huggingface.co",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "content creation"]
    },
    {
      id: "perplexity",
      name: "Perplexity AI",
      description: "AI-powered search and answer engine",
      category: "Text Generation",
      pricing: "Free tier + $20/month",
      website: "https://perplexity.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["text analysis", "content creation", "research"]
    },
    {
      id: "mistral",
      name: "Mistral AI",
      description: "European AI company with open-source models",
      category: "Text Generation",
      pricing: "Free tier + pay-per-use",
      website: "https://mistral.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "content creation"]
    },
    {
      id: "together",
      name: "Together AI",
      description: "Open-source AI models with easy API access",
      category: "Text Generation",
      pricing: "Free tier + $1/month",
      website: "https://together.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "content creation"]
    },
    {
      id: "groq",
      name: "Groq",
      description: "Ultra-fast AI inference with LPU technology",
      category: "Text Generation",
      pricing: "Free tier + pay-per-use",
      website: "https://groq.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["quote generation", "text analysis", "real-time processing"]
    }
  ],
  image: [
    {
      id: "zai-image",
      name: "Z.ai Images",
      description: "AI image generation with Z.ai",
      category: "Image Generation",
      pricing: "Free tier available",
      website: "https://z.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "image creation", "style transfer"]
    },
    {
      id: "openai-dalle",
      name: "OpenAI DALL-E",
      description: "Advanced image generation from text descriptions",
      category: "Image Generation",
      pricing: "$0.02-$0.08 per image",
      website: "https://openai.com/dall-e-2",
      requiresApiKey: true,
      isFree: false,
      costTier: "low-cost",
      capabilities: ["background generation", "image creation", "art generation"]
    },
    {
      id: "stability",
      name: "Stability AI",
      description: "Stable Diffusion image generation",
      category: "Image Generation",
      pricing: "Free tier + $10/month API",
      website: "https://stability.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["background generation", "image creation", "art generation"]
    },
    {
      id: "replicate-image",
      name: "Replicate",
      description: "Run and fine-tune AI models",
      category: "Image Generation",
      pricing: "Pay-per-use, varies by model",
      website: "https://replicate.com",
      requiresApiKey: true,
      isFree: false,
      costTier: "low-cost",
      capabilities: ["background generation", "image creation", "style transfer"]
    },
    {
      id: "midjourney",
      name: "Midjourney",
      description: "High-quality artistic image generation",
      category: "Image Generation",
      pricing: "Basic plan from $10/month",
      website: "https://midjourney.com",
      requiresApiKey: true,
      isFree: false,
      costTier: "low-cost",
      capabilities: ["background generation", "art generation", "style transfer"]
    },
    {
      id: "leonardo",
      name: "Leonardo.AI",
      description: "AI image generation and training",
      category: "Image Generation",
      pricing: "Free tier + $12/month",
      website: "https://leonardo.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["background generation", "image creation", "art generation"]
    },
    {
      id: "playground",
      name: "Playground AI",
      description: "Create and edit images with AI",
      category: "Image Generation",
      pricing: "Free tier + $15/month",
      website: "https://playgroundai.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["background generation", "image creation", "image editing"]
    },
    {
      id: "getimg",
      name: "GetImg.ai",
      description: "AI image generation with multiple models",
      category: "Image Generation",
      pricing: "Free 100 images/month",
      website: "https://getimg.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "image creation", "art generation"]
    },
    {
      id: "seaart",
      name: "SeaArt.ai",
      description: "AI art generation with community features",
      category: "Image Generation",
      pricing: "Free tier + credits",
      website: "https://seaart.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "art generation", "style transfer"]
    },
    {
      id: "pixart",
      name: "PixArt",
      description: "Open-source image generation model",
      category: "Image Generation",
      pricing: "Free open-source",
      website: "https://github.com/PixArt-alpha/PixArt-alpha",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "image creation", "art generation"]
    },
    {
      id: "starryai",
      name: "StarryAI",
      description: "AI art generation with mobile app",
      category: "Image Generation",
      pricing: "Free tier + $5/month",
      website: "https://starryai.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "art generation", "mobile creation"]
    },
    {
      id: "dreamstudio",
      name: "DreamStudio",
      description: "Stability AI's official interface",
      category: "Image Generation",
      pricing: "Free credits + paid",
      website: "https://dreamstudio.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["background generation", "image creation", "art generation"]
    }
  ],
  music: [
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      description: "Voice synthesis and music generation",
      category: "Music Generation",
      pricing: "Free tier + $5/month",
      website: "https://elevenlabs.io",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "voice synthesis", "sound design"]
    },
    {
      id: "suno",
      name: "Suno",
      description: "AI music generation and composition",
      category: "Music Generation",
      pricing: "Free tier + paid commercial",
      website: "https://suno.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "composition", "audio production"]
    },
    {
      id: "udio",
      name: "Udio",
      description: "AI music creation platform",
      category: "Music Generation",
      pricing: "Free tier + beta access",
      website: "https://udio.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "composition", "audio production"]
    },
    {
      id: "mubert",
      name: "Mubert",
      description: "AI music generation for content creators",
      category: "Music Generation",
      pricing: "Free tier + $14/month",
      website: "https://mubert.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["music generation", "ambient music", "background music"]
    },
    {
      id: "soundraw",
      name: "Soundraw",
      description: "AI-generated royalty-free music",
      category: "Music Generation",
      pricing: "Free tier + $16.99/month",
      website: "https://soundraw.io",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["music generation", "royalty-free music", "background music"]
    },
    {
      id: "beatoven",
      name: "Beatoven.ai",
      description: "AI music composition for videos",
      category: "Music Generation",
      pricing: "Free tier + $6/month",
      website: "https://beatoven.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "video scoring", "composition"]
    },
    {
      id: "aimusic",
      name: "AIMusic",
      description: "AI music generation with various genres",
      category: "Music Generation",
      pricing: "Free tier + $9/month",
      website: "https://aimusic.one",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "genre variety", "composition"]
    },
    {
      id: "loudly",
      name: "Loudly",
      description: "AI music generation for creators",
      category: "Music Generation",
      pricing: "Free tier + paid",
      website: "https://loudly.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "content creation", "royalty-free"]
    },
    {
      id: "audioalter",
      name: "AudioAlter",
      description: "AI audio processing and music generation",
      category: "Music Generation",
      pricing: "Free tier + credits",
      website: "https://audioalter.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "audio processing", "sound design"]
    },
    {
      id: "voicemod",
      name: "Voicemod Studio",
      description: "AI voice changing and music creation",
      category: "Music Generation",
      pricing: "Free tier + $10/month",
      website: "https://voicemod.net",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["music generation", "voice synthesis", "audio effects"]
    }
  ],
  video: [
    {
      id: "runway",
      name: "Runway ML",
      description: "AI video generation and editing tools",
      category: "Video Generation",
      pricing: "Free tier + $15/month",
      website: "https://runwayml.com",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["video generation", "video editing", "special effects"]
    },
    {
      id: "pika",
      name: "Pika Labs",
      description: "AI video generation from text and images",
      category: "Video Generation",
      pricing: "Free tier + paid higher quality",
      website: "https://pika.art",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "animation", "text-to-video"]
    },
    {
      id: "heygen",
      name: "HeyGen",
      description: "AI video generation with avatars",
      category: "Video Generation",
      pricing: "Free trial + $29/month",
      website: "https://heygen.com",
      requiresApiKey: true,
      isFree: false,
      costTier: "paid",
      capabilities: ["video generation", "avatar creation", "presentation videos"]
    },
    {
      id: "synthesia",
      name: "Synthesia",
      description: "AI video generation with AI avatars",
      category: "Video Generation",
      pricing: "Free trial + $22/month",
      website: "https://synthesia.io",
      requiresApiKey: true,
      isFree: false,
      costTier: "paid",
      capabilities: ["video generation", "avatar creation", "training videos"]
    },
    {
      id: "invideo",
      name: "InVideo AI",
      description: "AI-powered video creation platform",
      category: "Video Generation",
      pricing: "Free tier + $20/month",
      website: "https://invideo.io",
      requiresApiKey: true,
      isFree: true,
      costTier: "low-cost",
      capabilities: ["video generation", "video editing", "content creation"]
    },
    {
      id: "luma",
      name: "Luma Labs",
      description: "AI video generation and Dream Machine",
      category: "Video Generation",
      pricing: "Free tier + paid plans",
      website: "https://lumalabs.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "animation", "special effects"]
    },
    {
      id: "kaiber",
      name: "Kaiber",
      description: "AI video generation with artistic styles",
      category: "Video Generation",
      pricing: "Free tier + $10/month",
      website: "https://kaiber.ai",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "artistic styles", "animation"]
    },
    {
      id: "deforum",
      name: "Deforum",
      description: "Open-source AI video generation",
      category: "Video Generation",
      pricing: "Free open-source",
      website: "https://github.com/deforum/stable-diffusion",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "animation", "open-source"]
    },
    {
      id: "zeroscope",
      name: "Zeroscope",
      description: "AI video generation with text prompts",
      category: "Video Generation",
      pricing: "Free tier + paid",
      website: "https://zeroscope.pics",
      requiresApiKey: true,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "text-to-video", "animation"]
    },
    {
      id: "modelscope",
      name: "ModelScope",
      description: "Open-source video generation models",
      category: "Video Generation",
      pricing: "Free open-source",
      website: "https://modelscope.cn",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "text-to-video", "open-source"]
    },
    {
      id: "videocrafter",
      name: "VideoCrafter",
      description: "Open-source text-to-video generation",
      category: "Video Generation",
      pricing: "Free open-source",
      website: "https://github.com/AILab-CVC/VideoCrafter",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "text-to-video", "open-source"]
    },
    {
      id: "animatedrawings",
      name: "Animated Drawings",
      description: "Meta's free animation tool",
      category: "Video Generation",
      pricing: "Free meta tool",
      website: "https://animatedrawings.meta.com",
      requiresApiKey: false,
      isFree: true,
      costTier: "free",
      capabilities: ["video generation", "animation", "drawing to video"]
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const costFilter = searchParams.get('costFilter')

    let providers = aiProviders

    // Apply cost filtering if specified
    if (costFilter && costFilter !== 'all') {
      providers = Object.keys(providers).reduce((acc, key) => {
        acc[key] = providers[key as keyof typeof providers].filter(
          (provider: any) => provider.costTier === costFilter
        )
        return acc
      }, {} as typeof providers)
    }

    if (category && category in providers) {
      return NextResponse.json(providers[category as keyof typeof providers])
    }

    return NextResponse.json(providers)

  } catch (error) {
    console.error('Error fetching AI providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI providers' },
      { status: 500 }
    )
  }
}