"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Key, Globe, Database, RefreshCw, ExternalLink, CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react"

type AIProvidersTabProps = Record<string, never>

export function AIProvidersTab({}: AIProvidersTabProps) {
  const [activeTab, setActiveTab] = useState("providers")
  const [advancedMode, setAdvancedMode] = useState(false)
  const [costFilter, setCostFilter] = useState<"all" | "free" | "low-cost" | "paid">("all")
  
  // API Keys - Text Generation
  const [zaiApiKey, setZaiApiKey] = useState("")
  const [openaiApiKey, setOpenaiApiKey] = useState("")
  const [anthropicApiKey, setAnthropicApiKey] = useState("")
  const [googleApiKey, setGoogleApiKey] = useState("")
  const [cohereApiKey, setCohereApiKey] = useState("")
  const [perplexityApiKey, setPerplexityApiKey] = useState("")
  const [mistralApiKey, setMistralApiKey] = useState("")
  const [togetherApiKey, setTogetherApiKey] = useState("")
  const [groqApiKey, setGroqApiKey] = useState("")
  
  // API Keys - Image Generation
  const [stabilityApiKey, setStabilityApiKey] = useState("")
  const [replicateApiKey, setReplicateApiKey] = useState("")
  const [midjourneyApiKey, setMidjourneyApiKey] = useState("")
  const [leonardoApiKey, setLeonardoApiKey] = useState("")
  const [playgroundApiKey, setPlaygroundApiKey] = useState("")
  const [getimgApiKey, setGetimgApiKey] = useState("")
  const [seaartApiKey, setSeaartApiKey] = useState("")
  const [starryaiApiKey, setStarryaiApiKey] = useState("")
  const [dreamstudioApiKey, setDreamstudioApiKey] = useState("")
  
  // API Keys - Music Generation
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("")
  const [sunoApiKey, setSunoApiKey] = useState("")
  const [udioApiKey, setUdioApiKey] = useState("")
  const [mubertApiKey, setMubertApiKey] = useState("")
  const [soundrawApiKey, setSoundrawApiKey] = useState("")
  const [beatovenApiKey, setBeatovenApiKey] = useState("")
  const [aimusicApiKey, setAimusicApiKey] = useState("")
  const [loudlyApiKey, setLoudlyApiKey] = useState("")
  const [audioalterApiKey, setAudioalterApiKey] = useState("")
  const [voicemodApiKey, setVoicemodApiKey] = useState("")
  
  // API Keys - Video Generation
  const [runwayApiKey, setRunwayApiKey] = useState("")
  const [pikaApiKey, setPikaApiKey] = useState("")
  const [heygenApiKey, setHeygenApiKey] = useState("")
  const [synthesiaApiKey, setSynthesiaApiKey] = useState("")
  const [invideoApiKey, setInvideoApiKey] = useState("")
  const [lumaApiKey, setLumaApiKey] = useState("")
  const [kaiberApiKey, setKaiberApiKey] = useState("")
  
  // API Keys - Social Media
  const [tiktokApiKey, setTiktokApiKey] = useState("")
  const [telegramApiKey, setTelegramApiKey] = useState("")
  const [instagramApiKey, setInstagramApiKey] = useState("")
  const [youtubeApiKey, setYoutubeApiKey] = useState("")
  const [facebookApiKey, setFacebookApiKey] = useState("")
  const [xApiKey, setXApiKey] = useState("")
  
  // Settings
  const [storageProvider, setStorageProvider] = useState("local")
  const [ffmpegPath, setFfmpegPath] = useState("")
  const [storagePath, setStoragePath] = useState("")
  
  // Provider list
  const [providers, setProviders] = useState<any[]>([])
  const [isLoadingProviders, setIsLoadingProviders] = useState(false)

  // API Key validation states
  const [validationStatus, setValidationStatus] = useState<Record<string, 'valid' | 'invalid' | 'validating' | 'unknown'>>({})
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)
  
  // Debounce timeouts
  const [debounceTimeouts, setDebounceTimeouts] = useState<Record<string, NodeJS.Timeout>>({})

  // Load saved API keys and settings on component mount
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem('aiApiKeys')
      if (savedKeys) {
        const apiKeys = JSON.parse(savedKeys)
        
        // Text Generation Keys
        setZaiApiKey(apiKeys.zai || '')
        setOpenaiApiKey(apiKeys.openai || '')
        setAnthropicApiKey(apiKeys.anthropic || '')
        setGoogleApiKey(apiKeys.google || '')
        setCohereApiKey(apiKeys.cohere || '')
        setPerplexityApiKey(apiKeys.perplexity || '')
        setMistralApiKey(apiKeys.mistral || '')
        setTogetherApiKey(apiKeys.together || '')
        setGroqApiKey(apiKeys.groq || '')
        
        // Image Generation Keys
        setStabilityApiKey(apiKeys.stability || '')
        setReplicateApiKey(apiKeys.replicate || '')
        setMidjourneyApiKey(apiKeys.midjourney || '')
        setLeonardoApiKey(apiKeys.leonardo || '')
        setPlaygroundApiKey(apiKeys.playground || '')
        setGetimgApiKey(apiKeys.getimg || '')
        setSeaartApiKey(apiKeys.seaart || '')
        setStarryaiApiKey(apiKeys.starryai || '')
        setDreamstudioApiKey(apiKeys.dreamstudio || '')
        
        // Music Generation Keys
        setElevenLabsApiKey(apiKeys.elevenLabs || '')
        setSunoApiKey(apiKeys.suno || '')
        setUdioApiKey(apiKeys.udio || '')
        setMubertApiKey(apiKeys.mubert || '')
        setSoundrawApiKey(apiKeys.soundraw || '')
        setBeatovenApiKey(apiKeys.beatoven || '')
        setAimusicApiKey(apiKeys.aimusic || '')
        setLoudlyApiKey(apiKeys.loudly || '')
        setAudioalterApiKey(apiKeys.audioalter || '')
        setVoicemodApiKey(apiKeys.voicemod || '')
        
        // Video Generation Keys
        setRunwayApiKey(apiKeys.runway || '')
        setPikaApiKey(apiKeys.pika || '')
        setHeygenApiKey(apiKeys.heygen || '')
        setSynthesiaApiKey(apiKeys.synthesia || '')
        setInvideoApiKey(apiKeys.invideo || '')
        setLumaApiKey(apiKeys.luma || '')
        setKaiberApiKey(apiKeys.kaiber || '')
        
        // Social Media Keys
        setTiktokApiKey(apiKeys.tiktok || '')
        setTelegramApiKey(apiKeys.telegram || '')
        setInstagramApiKey(apiKeys.instagram || '')
        setYoutubeApiKey(apiKeys.youtube || '')
        setFacebookApiKey(apiKeys.facebook || '')
        setXApiKey(apiKeys.x || '')
      }
      
      const savedSettings = localStorage.getItem('aiSettings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setStorageProvider(settings.storageProvider || 'local')
        setFfmpegPath(settings.ffmpegPath || '')
        setStoragePath(settings.storagePath || '')
      }
    } catch (error) {
      console.error('Error loading saved configuration:', error)
    }
  }, [])

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
    ],
    social: [
      {
        id: "tiktok",
        name: "TikTok",
        description: "Short-form video hosting service",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://tiktok.com",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["video sharing", "short content", "social posting"]
      },
      {
        id: "telegram",
        name: "Telegram",
        description: "Cloud-based instant messaging app",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://telegram.org",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["messaging", "channel posting", "bot integration"]
      },
      {
        id: "instagram",
        name: "Instagram",
        description: "Photo and video sharing social network",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://instagram.com",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["photo sharing", "video sharing", "story posting"]
      },
      {
        id: "youtube",
        name: "YouTube",
        description: "Video sharing and social media platform",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://youtube.com",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["video hosting", "live streaming", "content monetization"]
      },
      {
        id: "facebook",
        name: "Facebook",
        description: "Social networking and media platform",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://facebook.com",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["social networking", "content sharing", "page management"]
      },
      {
        id: "x",
        name: "X (Twitter)",
        description: "Microblogging and social networking service",
        category: "Social Media",
        pricing: "Free platform",
        website: "https://x.com",
        requiresApiKey: true,
        isFree: true,
        costTier: "free",
        capabilities: ["microblogging", "social networking", "content sharing"]
      }
    ]
  }

  const loadProviders = async () => {
    setIsLoadingProviders(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProviders(Object.values(aiProviders).flat())
    } catch (error) {
      console.error("Error loading providers:", error)
    } finally {
      setIsLoadingProviders(false)
    }
  }

  const handleSaveConfiguration = async () => {
    try {
      // Save all API keys to localStorage
      const apiKeys = {
        // Text Generation Keys
        zai: zaiApiKey,
        openai: openaiApiKey,
        anthropic: anthropicApiKey,
        google: googleApiKey,
        cohere: cohereApiKey,
        perplexity: perplexityApiKey,
        mistral: mistralApiKey,
        together: togetherApiKey,
        groq: groqApiKey,
        
        // Image Generation Keys
        stability: stabilityApiKey,
        replicate: replicateApiKey,
        midjourney: midjourneyApiKey,
        leonardo: leonardoApiKey,
        playground: playgroundApiKey,
        getimg: getimgApiKey,
        seaart: seaartApiKey,
        starryai: starryaiApiKey,
        dreamstudio: dreamstudioApiKey,
        
        // Music Generation Keys
        elevenLabs: elevenLabsApiKey,
        suno: sunoApiKey,
        udio: udioApiKey,
        mubert: mubertApiKey,
        soundraw: soundrawApiKey,
        beatoven: beatovenApiKey,
        aimusic: aimusicApiKey,
        loudly: loudlyApiKey,
        audioalter: audioalterApiKey,
        voicemod: voicemodApiKey,
        
        // Video Generation Keys
        runway: runwayApiKey,
        pika: pikaApiKey,
        heygen: heygenApiKey,
        synthesia: synthesiaApiKey,
        invideo: invideoApiKey,
        luma: lumaApiKey,
        kaiber: kaiberApiKey,
        
        // Social Media Keys
        tiktok: tiktokApiKey,
        telegram: telegramApiKey,
        instagram: instagramApiKey,
        youtube: youtubeApiKey,
        facebook: facebookApiKey,
        x: xApiKey
      }
      
      localStorage.setItem('aiApiKeys', JSON.stringify(apiKeys))
      
      // Save settings to localStorage
      const settings = {
        storageProvider,
        ffmpegPath,
        storagePath
      }
      
      localStorage.setItem('aiSettings', JSON.stringify(settings))
      
      alert("Configuration saved successfully!")
    } catch (error) {
      console.error("Error saving configuration:", error)
      alert("Failed to save configuration. Please try again.")
    }
  }

  const handleTestConnection = async (providerId: string) => {
    try {
      // Simulate API call to test connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Connection to ${providerId} tested successfully!`)
    } catch (error) {
      console.error("Error testing connection:", error)
      alert(`Failed to connect to ${providerId}. Please check your API key.`)
    }
  }

  const validateApiKey = async (providerId: string, apiKey: string) => {
    if (!apiKey.trim()) {
      setValidationStatus(prev => ({ ...prev, [providerId]: 'unknown' }))
      setValidationMessages(prev => ({ ...prev, [providerId]: '' }))
      return
    }

    setValidationStatus(prev => ({ ...prev, [providerId]: 'validating' }))
    setValidationMessages(prev => ({ ...prev, [providerId]: 'Validating API key...' }))
    setIsValidating(true)

    try {
      // First try the basic validation endpoint (most reliable)
      console.log('Testing API key with basic validation endpoint...')
      const basicResponse = await fetch('/api/validate-api-key-basic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          provider: providerId
        }),
      })

      const basicResult = await basicResponse.json()
      console.log('Basic validation result:', basicResult)

      if (basicResult.valid) {
        setValidationStatus(prev => ({ ...prev, [providerId]: 'valid' }))
        setValidationMessages(prev => ({ 
          ...prev, 
          [providerId]: basicResult.message || 'API key is valid' + (basicResult.response ? ` - Response: "${basicResult.response}"` : '')
        }))
        setIsValidating(false)
        return
      } else if (basicResult.warning) {
        setValidationStatus(prev => ({ ...prev, [providerId]: 'valid' }))
        setValidationMessages(prev => ({ 
          ...prev, 
          [providerId]: `⚠️ ${basicResult.warning}`
        }))
        setIsValidating(false)
        return
      }

      // If basic validation fails, try the debug endpoint to understand why
      console.log('Basic validation failed, trying debug endpoint...')
      try {
        const debugResponse = await fetch('/api/debug-zai-sdk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: apiKey.trim(),
            provider: providerId
          }),
        })

        const debugResult = await debugResponse.json()
        console.log('Debug result:', debugResult)

        let errorMessage = basicResult.error || 'API key validation failed'
        
        // Add debug information if available
        if (debugResult.error) {
          errorMessage += ` | Debug: ${debugResult.error}`
        }
        
        // Add suggestion if available
        if (basicResult.suggestion) {
          errorMessage += ` | Suggestion: ${basicResult.suggestion}`
        }
        
        // Add format check information
        if (basicResult.formatChecks) {
          const formatIssues = Object.entries(basicResult.formatChecks)
            .filter(([key, value]) => value === true)
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
            .join(', ')
          
          if (formatIssues) {
            errorMessage += ` | Format issues: ${formatIssues}`
          }
        }
        
        setValidationStatus(prev => ({ ...prev, [providerId]: 'invalid' }))
        setValidationMessages(prev => ({ ...prev, [providerId]: errorMessage }))
      } catch (debugError) {
        console.error('Debug endpoint failed:', debugError)
        
        // If debug fails, just show the basic error
        let errorMessage = basicResult.error || 'API key is invalid'
        if (basicResult.suggestion) {
          errorMessage += ` | ${basicResult.suggestion}`
        }
        
        setValidationStatus(prev => ({ ...prev, [providerId]: 'invalid' }))
        setValidationMessages(prev => ({ ...prev, [providerId]: errorMessage }))
      }
    } catch (error) {
      console.error('Error validating API key:', error)
      setValidationStatus(prev => ({ ...prev, [providerId]: 'invalid' }))
      setValidationMessages(prev => ({ 
        ...prev, 
        [providerId]: `Failed to validate API key: ${error.message}`
      }))
    } finally {
      setIsValidating(false)
    }
  }

  const debouncedValidate = (providerId: string, apiKey: string) => {
    // Clear existing timeout for this provider
    if (debounceTimeouts[providerId]) {
      clearTimeout(debounceTimeouts[providerId])
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      validateApiKey(providerId, apiKey)
      // Remove timeout from state after execution
      setDebounceTimeouts(prev => {
        const newTimeouts = { ...prev }
        delete newTimeouts[providerId]
        return newTimeouts
      })
    }, 1000)
    
    setDebounceTimeouts(prev => ({ ...prev, [providerId]: timeout }))
  }

  const getValidationIcon = (providerId: string) => {
    const status = validationStatus[providerId]
    
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'invalid':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'validating':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getValidationColor = (providerId: string) => {
    const status = validationStatus[providerId]
    
    switch (status) {
      case 'valid':
        return 'text-green-600'
      case 'invalid':
        return 'text-red-600'
      case 'validating':
        return 'text-blue-600'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">AI Providers & API Configuration</h2>
        <p className="text-muted-foreground">
          Manage your AI service providers and API keys
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers">AI Providers</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="configuration">API Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">AI Service Providers</h3>
              <p className="text-sm text-muted-foreground">
                Explore available AI services for content creation
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="advanced-mode"
                checked={advancedMode}
                onCheckedChange={setAdvancedMode}
              />
              <Label htmlFor="advanced-mode">Advanced Mode</Label>
              <Button 
                variant="outline" 
                onClick={loadProviders}
                disabled={isLoadingProviders}
              >
                {isLoadingProviders ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh List
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Cost Filter */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Filter by cost:</span>
              <div className="flex space-x-2">
                {[
                  { value: "all", label: "All" },
                  { value: "free", label: "Free" },
                  { value: "low-cost", label: "Low Cost" },
                  { value: "paid", label: "Paid" }
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={costFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCostFilter(filter.value as any)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {Object.entries(aiProviders).map(([category, providers]) => {
              const filteredProviders = costFilter === "all" 
                ? providers 
                : providers.filter((provider: any) => provider.costTier === costFilter)
              
              if (filteredProviders.length === 0) return null

              return (
                <Card key={category}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="capitalize">{category} Providers</CardTitle>
                        <CardDescription>
                          AI services for {category.toLowerCase()} generation
                          {costFilter !== "all" && (
                            <span className="ml-2 text-primary">
                              ({filteredProviders.length} {costFilter} options)
                            </span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredProviders.map((provider) => (
                        <Card key={provider.id} className="relative">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{provider.name}</CardTitle>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={
                                    provider.costTier === "free" ? "default" : 
                                    provider.costTier === "low-cost" ? "secondary" : "destructive"
                                  }>
                                    {provider.costTier === "free" ? "Free" : 
                                     provider.costTier === "low-cost" ? "Low Cost" : "Paid"}
                                  </Badge>
                                  {provider.requiresApiKey && (
                                    <Badge variant="outline">API Key</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {provider.description}
                            </p>
                            <div className="text-sm">
                              <span className="font-medium">Pricing: </span>
                              <span className="text-muted-foreground">{provider.pricing}</span>
                            </div>
                            {provider.capabilities && (
                              <div className="flex flex-wrap gap-1">
                                {provider.capabilities.map((capability: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {capability}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => window.open(provider.website, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Visit
                              </Button>
                              {provider.requiresApiKey && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleTestConnection(provider.id)}
                                >
                                  Test
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Social Media Platforms</h3>
              <p className="text-sm text-muted-foreground">
                Configure API keys for social media posting and integration
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiProviders.social.map((provider) => (
              <Card key={provider.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{provider.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {provider.description}
                      </CardDescription>
                    </div>
                    <Badge variant={provider.isFree ? "default" : "secondary"}>
                      {provider.pricing}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <div className="font-medium">Capabilities:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.capabilities.map((capability: string) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {provider.requiresApiKey && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <Input
                          type="password"
                          placeholder={`Enter ${provider.name} API key`}
                          value={
                            provider.id === 'tiktok' ? tiktokApiKey :
                            provider.id === 'telegram' ? telegramApiKey :
                            provider.id === 'instagram' ? instagramApiKey :
                            provider.id === 'youtube' ? youtubeApiKey :
                            provider.id === 'facebook' ? facebookApiKey :
                            provider.id === 'x' ? xApiKey : ''
                          }
                          onChange={(e) => {
                            if (provider.id === 'tiktok') setTiktokApiKey(e.target.value)
                            else if (provider.id === 'telegram') setTelegramApiKey(e.target.value)
                            else if (provider.id === 'instagram') setInstagramApiKey(e.target.value)
                            else if (provider.id === 'youtube') setYoutubeApiKey(e.target.value)
                            else if (provider.id === 'facebook') setFacebookApiKey(e.target.value)
                            else if (provider.id === 'x') setXApiKey(e.target.value)
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(provider.website, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Visit
                      </Button>
                      {provider.requiresApiKey && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(provider.id)}
                        >
                          Test
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">API Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Configure your API keys and settings
              </p>
            </div>
            <Button onClick={handleSaveConfiguration}>
              <Settings className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>

          <div className="space-y-6">
            {/* Core Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Core Services
                </CardTitle>
                <CardDescription>
                  Essential API keys for basic functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">ZAI API Key</label>
                    <div className="flex items-center gap-2">
                      {getValidationIcon('zai')}
                      <span className={`text-xs ${getValidationColor('zai')}`}>
                        {validationMessages['zai']}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => validateApiKey('zai', zaiApiKey)}
                        disabled={isValidating}
                        className="h-6 px-2 text-xs"
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter your ZAI API key"
                    value={zaiApiKey}
                    onChange={(e) => {
                      setZaiApiKey(e.target.value)
                      debouncedValidate('zai', e.target.value)
                    }}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Required for AI quote generation and basic features
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Storage Provider</label>
                  <Select value={storageProvider} onValueChange={setStorageProvider}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="google_drive">Google Drive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {storageProvider === "google_drive" && (
                  <div>
                    <label className="text-sm font-medium">Google Drive API Key</label>
                    <Input
                      type="password"
                      placeholder="Enter your Google Drive API key"
                      value={googleDriveApiKey}
                      onChange={(e) => setGoogleDriveApiKey(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  AI Services
                </CardTitle>
                <CardDescription>
                  API keys for various AI providers (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">OpenAI API Key</label>
                      <div className="flex items-center gap-2">
                        {getValidationIcon('openai')}
                        <span className={`text-xs ${getValidationColor('openai')}`}>
                          {validationMessages['openai']}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => validateApiKey('openai', openaiApiKey)}
                          disabled={isValidating}
                          className="h-6 px-2 text-xs"
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={openaiApiKey}
                      onChange={(e) => {
                        setOpenaiApiKey(e.target.value)
                        debouncedValidate('openai', e.target.value)
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Stability AI API Key</label>
                      <div className="flex items-center gap-2">
                        {getValidationIcon('stability')}
                        <span className={`text-xs ${getValidationColor('stability')}`}>
                          {validationMessages['stability']}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => validateApiKey('stability', stabilityApiKey)}
                          disabled={isValidating}
                          className="h-6 px-2 text-xs"
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter your Stability AI key"
                      value={stabilityApiKey}
                      onChange={(e) => {
                        setStabilityApiKey(e.target.value)
                        debouncedValidate('stability', e.target.value)
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">ElevenLabs API Key</label>
                    <Input
                      type="password"
                      placeholder="Enter your ElevenLabs key"
                      value={elevenLabsApiKey}
                      onChange={(e) => setElevenLabsApiKey(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Runway ML API Key</label>
                    <Input
                      type="password"
                      placeholder="Enter your Runway key"
                      value={runwayApiKey}
                      onChange={(e) => setRunwayApiKey(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Replicate API Key</label>
                    <Input
                      type="password"
                      placeholder="Enter your Replicate key"
                      value={replicateApiKey}
                      onChange={(e) => setReplicateApiKey(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            {advancedMode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Advanced configuration options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">FFmpeg Path</label>
                    <Input
                      placeholder="/usr/local/bin/ffmpeg"
                      value={ffmpegPath}
                      onChange={(e) => setFfmpegPath(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Path to FFmpeg executable for video processing
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Storage Path</label>
                    <Input
                      placeholder="./uploads"
                      value={storagePath}
                      onChange={(e) => setStoragePath(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Directory path for storing uploaded files
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Debug Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Debug Tools
                </CardTitle>
                <CardDescription>
                  Debug API key validation issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/test-packages')
                        const result = await response.json()
                        alert('Package Test Results:\n' + JSON.stringify(result, null, 2))
                      } catch (error) {
                        alert('Package test failed: ' + error.message)
                      }
                    }}
                  >
                    Test Packages
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/debug-zai-sdk', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ apiKey: '', provider: 'debug' })
                        })
                        const result = await response.json()
                        alert('ZAI SDK Debug Results:\n' + JSON.stringify(result, null, 2))
                      } catch (error) {
                        alert('ZAI SDK debug failed: ' + error.message)
                      }
                    }}
                  >
                    Debug ZAI SDK
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use these tools to diagnose issues with API key validation. Check the browser console for detailed logs.
                </p>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Notice:</strong> All API keys are stored locally in your browser and are never sent to external servers. 
                Keep your API keys secure and never share them publicly.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}