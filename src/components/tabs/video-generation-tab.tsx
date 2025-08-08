"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Loader2, Video, Image, Music, Play, Pause, Download, CheckCircle } from "lucide-react"

interface VideoGenerationTabProps {
  approvedQuote: string | null
  onVideoGenerated: (videoUrl: string) => void
}

export function VideoGenerationTab({ approvedQuote, onVideoGenerated }: VideoGenerationTabProps) {
  const [backgroundMode, setBackgroundMode] = useState<"ai" | "manual">("ai")
  const [musicMode, setMusicMode] = useState<"ai" | "manual" | "none">("ai")
  const [videoMode, setVideoMode] = useState<"ai" | "manual">("ai")
  
  // Background settings
  const [selectedBackgroundProvider, setSelectedBackgroundProvider] = useState("zai")
  const [selectedBackgroundStyle, setSelectedBackgroundStyle] = useState("philosophical")
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null)
  
  // Music settings
  const [selectedMusicProvider, setSelectedMusicProvider] = useState("elevenlabs")
  const [selectedMusicGenre, setSelectedMusicGenre] = useState("ambient")
  const [selectedMusicMood, setSelectedMusicMood] = useState("contemplative")
  const [musicDuration, setMusicDuration] = useState([30])
  const [musicFile, setMusicFile] = useState<File | null>(null)
  
  // Video settings
  const [selectedVideoProvider, setSelectedVideoProvider] = useState("runway")
  const [selectedVideoStyle, setSelectedVideoStyle] = useState("cinematic")
  const [selectedVideoDuration, setSelectedVideoDuration] = useState("30")
  const [selectedVideoQuality, setSelectedVideoQuality] = useState("medium")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  
  // Generation states
  const [isGeneratingBackground, setIsGeneratingBackground] = useState(false)
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [generatedBackgroundUrl, setGeneratedBackgroundUrl] = useState<string | null>(null)
  const [generatedMusicUrl, setGeneratedMusicUrl] = useState<string | null>(null)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showBackgroundPreview, setShowBackgroundPreview] = useState(false)
  const [showMusicPreview, setShowMusicPreview] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [musicProgress, setMusicProgress] = useState(0)

  const backgroundProviders = [
    { value: "zai", label: "Z.ai", pricing: "Free tier available" },
    { value: "openai", label: "OpenAI DALL-E", pricing: "$0.02-$0.08 per image" },
    { value: "stability", label: "Stability AI", pricing: "Free tier + $10/month" },
    { value: "replicate", label: "Replicate", pricing: "Pay-per-use" },
    { value: "midjourney", label: "Midjourney", pricing: "Free tier + $10/month" },
    { value: "leonardo", label: "Leonardo.AI", pricing: "Free tier + $12/month" },
    { value: "playground", label: "Playground AI", pricing: "Free tier + $15/month" },
    { value: "getimg", label: "GetImg.ai", pricing: "Free 100 images/month" },
    { value: "seaart", label: "SeaArt.ai", pricing: "Free tier + credits" },
    { value: "pixart", label: "PixArt", pricing: "Free open-source" },
    { value: "starryai", label: "StarryAI", pricing: "Free tier + $5/month" },
    { value: "dreamstudio", label: "DreamStudio", pricing: "Free credits + paid" }
  ]

  const backgroundStyles = [
    { value: "philosophical", label: "Philosophical", description: "Deep, thoughtful, classical" },
    { value: "modern", label: "Modern", description: "Contemporary, clean, minimalist" },
    { value: "artistic", label: "Artistic", description: "Creative, expressive, unique" },
    { value: "minimalist", label: "Minimalist", description: "Simple, clean, focused" }
  ]

  const musicProviders = [
    { value: "elevenlabs", label: "ElevenLabs", pricing: "Free tier + $5/month" },
    { value: "replicate", label: "Replicate", pricing: "Pay-per-use" },
    { value: "openai", label: "OpenAI", pricing: "Music planning" },
    { value: "suno", label: "Suno", pricing: "Free tier + paid" },
    { value: "udio", label: "Udio", pricing: "Free beta + paid" },
    { value: "mubert", label: "Mubert", pricing: "Free tier + $14/month" },
    { value: "soundraw", label: "Soundraw", pricing: "Free tier + $16.99/month" },
    { value: "beatoven", label: "Beatoven.ai", pricing: "Free tier + $6/month" },
    { value: "aimusic", label: "AIMusic", pricing: "Free tier + $9/month" },
    { value: "loudly", label: "Loudly", pricing: "Free tier + paid" },
    { value: "audioalter", label: "AudioAlter", pricing: "Free tier + credits" },
    { value: "voicemod", label: "Voicemod Studio", pricing: "Free tier + $10/month" }
  ]

  const musicGenres = [
    { value: "ambient", label: "Ambient", description: "Atmospheric, background" },
    { value: "classical", label: "Classical", description: "Traditional, orchestral" },
    { value: "electronic", label: "Electronic", description: "Modern, synthetic" },
    { value: "acoustic", label: "Acoustic", description: "Natural, organic" }
  ]

  const musicMoods = [
    { value: "contemplative", label: "Contemplative", description: "Thoughtful, reflective" },
    { value: "inspirational", label: "Inspirational", description: "Uplifting, motivating" },
    { value: "mysterious", label: "Mysterious", description: "Enigmatic, intriguing" },
    { value: "peaceful", label: "Peaceful", description: "Calm, serene" }
  ]

  const videoProviders = [
    { value: "runway", label: "Runway ML", pricing: "Free tier + $15/month" },
    { value: "pika", label: "Pika Labs", pricing: "Free tier + paid" },
    { value: "heygen", label: "HeyGen", pricing: "Free trial + $29/month" },
    { value: "synthesia", label: "Synthesia", pricing: "Free trial + $22/month" },
    { value: "invideo", label: "InVideo AI", pricing: "Free tier + $20/month" },
    { value: "luma", label: "Luma Labs", pricing: "Free tier + paid plans" },
    { value: "kaiber", label: "Kaiber", pricing: "Free tier + $10/month" },
    { value: "deforum", label: "Deforum", pricing: "Free open-source" },
    { value: "zeroscope", label: "Zeroscope", pricing: "Free tier + paid" },
    { value: "modelscope", label: "ModelScope", pricing: "Free open-source" },
    { value: "videocrafter", label: "VideoCrafter", pricing: "Free open-source" },
    { value: "animatedrawings", label: "Animated Drawings", pricing: "Free meta tool" }
  ]

  const videoStyles = [
    { value: "cinematic", label: "Cinematic", description: "Film-quality, dramatic" },
    { value: "animated", label: "Animated", description: "Motion graphics, dynamic" },
    { value: "minimalist", label: "Minimalist", description: "Clean, simple, focused" },
    { value: "artistic", label: "Artistic", description: "Creative, stylized" }
  ]

  const videoQualities = [
    { value: "low", label: "Low (480p)", description: "Faster generation, smaller file" },
    { value: "medium", label: "Medium (720p)", description: "Balanced quality" },
    { value: "high", label: "High (1080p)", description: "Best quality, larger file" }
  ]

  const handleGenerateBackground = async () => {
    setIsGeneratingBackground(true)
    try {
      // Get API key from localStorage
      const savedKeys = localStorage.getItem('aiApiKeys')
      const apiKeys = savedKeys ? JSON.parse(savedKeys) : {}
      
      const response = await fetch("/api/generate-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedBackgroundProvider,
          style: selectedBackgroundStyle,
          quote: approvedQuote,
          apiKey: apiKeys.zai || null
        })
      })

      if (!response.ok) throw new Error("Failed to generate background")
      
      const data = await response.json()
      setGeneratedBackgroundUrl(data.imageUrl)
    } catch (error) {
      console.error("Error generating background:", error)
      alert("Failed to generate background. Please try again.")
    } finally {
      setIsGeneratingBackground(false)
    }
  }

  const handleGenerateMusic = async () => {
    setIsGeneratingMusic(true)
    try {
      // Get API key from localStorage
      const savedKeys = localStorage.getItem('aiApiKeys')
      const apiKeys = savedKeys ? JSON.parse(savedKeys) : {}
      
      const response = await fetch("/api/generate-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedMusicProvider,
          genre: selectedMusicGenre,
          mood: selectedMusicMood,
          duration: musicDuration[0],
          quote: approvedQuote,
          apiKey: apiKeys.zai || null
        })
      })

      if (!response.ok) throw new Error("Failed to generate music")
      
      const data = await response.json()
      setGeneratedMusicUrl(data.musicUrl)
    } catch (error) {
      console.error("Error generating music:", error)
      alert("Failed to generate music. Please try again.")
    } finally {
      setIsGeneratingMusic(false)
    }
  }

  const handleGenerateVideo = async () => {
    if (!generatedBackgroundUrl && !backgroundFile) {
      alert("Please generate or upload a background first")
      return
    }
    if (musicMode !== "none" && !generatedMusicUrl && !musicFile) {
      alert("Please generate or upload music first")
      return
    }

    setIsGeneratingVideo(true)
    try {
      // Get API key from localStorage
      const savedKeys = localStorage.getItem('aiApiKeys')
      const apiKeys = savedKeys ? JSON.parse(savedKeys) : {}
      
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedVideoProvider,
          style: selectedVideoStyle,
          quote: approvedQuote,
          backgroundUrl: generatedBackgroundUrl,
          musicUrl: generatedMusicUrl,
          quality: selectedVideoQuality,
          duration: selectedVideoDuration,
          apiKey: apiKeys.zai || null
        })
      })

      if (!response.ok) throw new Error("Failed to generate video")
      
      const data = await response.json()
      setGeneratedVideoUrl(data.videoUrl)
      onVideoGenerated(data.videoUrl)
    } catch (error) {
      console.error("Error generating video:", error)
      alert("Failed to generate video. Please try again.")
    } finally {
      setIsGeneratingVideo(false)
    }
  }

  // Music progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlayingMusic && generatedMusicUrl) {
      interval = setInterval(() => {
        setMusicProgress(prev => {
          if (prev >= 100) {
            setIsPlayingMusic(false)
            return 0
          }
          return prev + (100 / (musicDuration[0] * 10)) // Update every 100ms
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlayingMusic, generatedMusicUrl, musicDuration])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Video Generation</h2>
        <p className="text-muted-foreground">
          Create your philosophical quote video with AI-generated backgrounds and music
        </p>
        {approvedQuote && (
          <div className="p-4 bg-muted rounded-lg max-w-2xl mx-auto">
            <blockquote className="text-lg italic">
              "{approvedQuote}"
            </blockquote>
          </div>
        )}
      </div>

      <Tabs defaultValue="background" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <TabsContent value="background" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-5 h-5" />
                Background Selection
              </CardTitle>
              <CardDescription>
                Choose how to create your video background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="background-mode"
                  checked={backgroundMode === "ai"}
                  onCheckedChange={(checked) => setBackgroundMode(checked ? "ai" : "manual")}
                />
                <Label htmlFor="background-mode">AI Generate Background</Label>
              </div>

              {backgroundMode === "ai" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">AI Provider</label>
                      <Select value={selectedBackgroundProvider} onValueChange={setSelectedBackgroundProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {backgroundProviders.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div>
                                <div className="font-medium">{provider.label}</div>
                                <div className="text-xs text-muted-foreground">{provider.pricing}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Style</label>
                      <Select value={selectedBackgroundStyle} onValueChange={setSelectedBackgroundStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {backgroundStyles.map((style) => (
                            <SelectItem key={style.value} value={style.value}>
                              <div>
                                <div className="font-medium">{style.label}</div>
                                <div className="text-xs text-muted-foreground">{style.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateBackground}
                    disabled={isGeneratingBackground}
                    className="w-full"
                  >
                    {isGeneratingBackground ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Background...
                      </>
                    ) : (
                      "Generate Background"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Upload Background Image</label>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => setBackgroundFile(e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Max file size: 10MB. Formats: JPEG, PNG, WebP
                    </p>
                  </div>
                </div>
              )}

              {generatedBackgroundUrl && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Background generated successfully! You can now proceed to music selection.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-background-preview"
                      checked={showBackgroundPreview}
                      onCheckedChange={setShowBackgroundPreview}
                    />
                    <Label htmlFor="show-background-preview">Show Background Preview</Label>
                  </div>

                  {showBackgroundPreview && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Background Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative group">
                          <img
                            src={generatedBackgroundUrl}
                            alt="Generated background"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex space-x-2">
                              <Button variant="secondary" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button variant="secondary" size="sm">
                                Zoom In
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Style</div>
                            <div className="text-muted-foreground">
                              {backgroundStyles.find(s => s.value === selectedBackgroundStyle)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Provider</div>
                            <div className="text-muted-foreground">
                              {backgroundProviders.find(p => p.value === selectedBackgroundProvider)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Size</div>
                            <div className="text-muted-foreground">1024x1024</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Music Selection
              </CardTitle>
              <CardDescription>
                Choose background music for your video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="music-mode-ai"
                    checked={musicMode === "ai"}
                    onCheckedChange={(checked) => setMusicMode(checked ? "ai" : musicMode === "ai" ? "manual" : "ai")}
                  />
                  <Label htmlFor="music-mode-ai">AI Generate Music</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="music-mode-none"
                    checked={musicMode === "none"}
                    onCheckedChange={(checked) => setMusicMode(checked ? "none" : "ai")}
                  />
                  <Label htmlFor="music-mode-none">No Music</Label>
                </div>
              </div>

              {musicMode === "ai" && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">AI Provider</label>
                      <Select value={selectedMusicProvider} onValueChange={setSelectedMusicProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {musicProviders.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div>
                                <div className="font-medium">{provider.label}</div>
                                <div className="text-xs text-muted-foreground">{provider.pricing}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Genre</label>
                      <Select value={selectedMusicGenre} onValueChange={setSelectedMusicGenre}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {musicGenres.map((genre) => (
                            <SelectItem key={genre.value} value={genre.value}>
                              <div>
                                <div className="font-medium">{genre.label}</div>
                                <div className="text-xs text-muted-foreground">{genre.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Mood</label>
                      <Select value={selectedMusicMood} onValueChange={setSelectedMusicMood}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {musicMoods.map((mood) => (
                            <SelectItem key={mood.value} value={mood.value}>
                              <div>
                                <div className="font-medium">{mood.label}</div>
                                <div className="text-xs text-muted-foreground">{mood.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Duration: {musicDuration[0]}s</label>
                      <Slider
                        value={musicDuration}
                        onValueChange={setMusicDuration}
                        max={60}
                        min={15}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateMusic}
                    disabled={isGeneratingMusic}
                    className="w-full"
                  >
                    {isGeneratingMusic ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Music...
                      </>
                    ) : (
                      "Generate Music"
                    )}
                  </Button>
                </div>
              )}

              {musicMode === "manual" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Upload Music File</label>
                    <Input
                      type="file"
                      accept="audio/mp3,audio/wav,audio/ogg"
                      onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Max file size: 20MB. Formats: MP3, WAV, OGG
                    </p>
                  </div>
                </div>
              )}

              {generatedMusicUrl && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Music generated successfully! You can now proceed to video creation.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-music-preview"
                      checked={showMusicPreview}
                      onCheckedChange={setShowMusicPreview}
                    />
                    <Label htmlFor="show-music-preview">Show Music Preview</Label>
                  </div>

                  {showMusicPreview && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Music Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-muted p-6 rounded-lg">
                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                            >
                              {isPlayingMusic ? (
                                <Pause className="w-6 h-6" />
                              ) : (
                                <Play className="w-6 h-6" />
                              )}
                            </Button>
                            <div className="flex-1">
                              <div className="text-sm font-medium mb-1">
                                {selectedMusicGenre} - {selectedMusicMood}
                              </div>
                              <div className="w-full bg-background rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${musicProgress}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>{Math.floor(musicProgress * musicDuration[0] / 100)}s</span>
                                <span>{musicDuration[0]}s</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Genre</div>
                            <div className="text-muted-foreground">
                              {musicGenres.find(g => g.value === selectedMusicGenre)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Mood</div>
                            <div className="text-muted-foreground">
                              {musicMoods.find(m => m.value === selectedMusicMood)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">{musicDuration[0]}s</div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Provider</div>
                            <div className="text-muted-foreground">
                              {musicProviders.find(p => p.value === selectedMusicProvider)?.label}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download MP3
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download WAV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Creation
              </CardTitle>
              <CardDescription>
                Generate your final video with quote, background, and music
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="video-mode"
                  checked={videoMode === "ai"}
                  onCheckedChange={(checked) => setVideoMode(checked ? "ai" : "manual")}
                />
                <Label htmlFor="video-mode">AI Generate Video</Label>
              </div>

              {videoMode === "ai" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">AI Provider</label>
                      <Select value={selectedVideoProvider} onValueChange={setSelectedVideoProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {videoProviders.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div>
                                <div className="font-medium">{provider.label}</div>
                                <div className="text-xs text-muted-foreground">{provider.pricing}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Style</label>
                      <Select value={selectedVideoStyle} onValueChange={setSelectedVideoStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {videoStyles.map((style) => (
                            <SelectItem key={style.value} value={style.value}>
                              <div>
                                <div className="font-medium">{style.label}</div>
                                <div className="text-xs text-muted-foreground">{style.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Duration</label>
                      <Select value={selectedVideoDuration} onValueChange={setSelectedVideoDuration}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="45">45 seconds</SelectItem>
                          <SelectItem value="60">60 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Quality</label>
                      <Select value={selectedVideoQuality} onValueChange={setSelectedVideoQuality}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {videoQualities.map((quality) => (
                            <SelectItem key={quality.value} value={quality.value}>
                              <div>
                                <div className="font-medium">{quality.label}</div>
                                <div className="text-xs text-muted-foreground">{quality.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Upload Video File</label>
                    <Input
                      type="file"
                      accept="video/mp4,video/mov,video/avi"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Max file size: 100MB. Formats: MP4, MOV, AVI
                    </p>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
                className="w-full"
              >
                {isGeneratingVideo ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  "Generate Video"
                )}
              </Button>

              {generatedVideoUrl && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Video generated successfully! You can now proceed to social media scheduling.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-preview"
                      checked={showPreview}
                      onCheckedChange={setShowPreview}
                    />
                    <Label htmlFor="show-preview">Show Video Preview</Label>
                  </div>

                  {showPreview && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Video Preview</CardTitle>
                          <Select value={selectedVideoQuality} onValueChange={setSelectedVideoQuality}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {videoQualities.map((quality) => (
                                <SelectItem key={quality.value} value={quality.value}>
                                  {quality.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative group">
                          <div className="aspect-video bg-gradient-to-br from-muted to-muted/80 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="text-center z-10">
                              <div className="relative">
                                <Button
                                  variant="secondary"
                                  size="lg"
                                  className="rounded-full w-16 h-16"
                                >
                                  <Play className="w-8 h-8" />
                                </Button>
                                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-3">
                                Click to play {selectedVideoDuration}s video
                              </p>
                            </div>
                            
                            {/* Video overlay with controls */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
                              <div className="w-full p-4 space-y-2">
                                <div className="w-full bg-white/20 rounded-full h-1">
                                  <div className="bg-white h-1 rounded-full w-1/3"></div>
                                </div>
                                <div className="flex justify-between text-white text-xs">
                                  <span>0:15</span>
                                  <span>{selectedVideoDuration}:00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">{selectedVideoDuration}s</div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Quality</div>
                            <div className="text-muted-foreground">
                              {videoQualities.find(q => q.value === selectedVideoQuality)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Style</div>
                            <div className="text-muted-foreground">
                              {videoStyles.find(s => s.value === selectedVideoStyle)?.label}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-medium">Provider</div>
                            <div className="text-muted-foreground">
                              {videoProviders.find(p => p.value === selectedVideoProvider)?.label}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium">Download Options:</div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Button variant="outline" className="flex items-center justify-center">
                              <Download className="w-4 h-4 mr-2" />
                              480p (~15MB)
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center">
                              <Download className="w-4 h-4 mr-2" />
                              720p (~35MB)
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center">
                              <Download className="w-4 h-4 mr-2" />
                              1080p (~75MB)
                            </Button>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            Share Video
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Copy Link
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}