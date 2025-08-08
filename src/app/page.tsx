"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { IdeaQuoteTab } from "@/components/tabs/idea-quote-tab"
import { VideoGenerationTab } from "@/components/tabs/video-generation-tab"
import { SocialMediaTab } from "@/components/tabs/social-media-tab"
import { AIProvidersTab } from "@/components/tabs/ai-providers-tab"
import { ThemeToggle } from "@/components/theme-toggle"
import { Lightbulb, Video, Share2, Settings, CheckCircle } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("idea")
  const [approvedQuote, setApprovedQuote] = useState<string | null>(null)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const handleTabChange = (value: string) => {
    // Allow navigation to any tab that's already been completed or is the AI providers tab
    // Also allow going back to any previous tab in the workflow
    const tabOrder = ["idea", "video", "social", "providers"]
    const currentIndex = tabOrder.indexOf(activeTab)
    const targetIndex = tabOrder.indexOf(value)
    
    // Always allow access to providers tab (for API key management)
    if (value === "providers") {
      setActiveTab(value)
      return
    }
    
    // Allow going back to any previous tab
    if (targetIndex <= currentIndex) {
      setActiveTab(value)
      return
    }
    
    // Validate forward progression
    if (value === "video" && !approvedQuote) {
      alert("Please approve a quote first before proceeding to video generation.")
      return
    }
    if (value === "social" && !generatedVideo) {
      alert("Please generate a video first before proceeding to social media.")
      return
    }
    
    setActiveTab(value)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10">
              <img
                src="/logo.svg"
                alt="Z.ai Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Local AI Agent</h1>
              <p className="text-sm text-muted-foreground">Create philosophical quote videos with AI</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {[
              { id: "idea", label: "Idea & Quote", icon: Lightbulb, completed: !!approvedQuote },
              { id: "video", label: "Video Generation", icon: Video, completed: !!generatedVideo },
              { id: "social", label: "Social Media", icon: Share2, completed: selectedPlatforms.length > 0 },
              { id: "providers", label: "AI Providers", icon: Settings, completed: false }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${activeTab === step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                  {step.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
                {index < 3 && (
                  <div className="w-16 h-0.5 bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="idea">Idea & Quote</TabsTrigger>
            <TabsTrigger value="video">Video Generation</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="providers">AI Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="idea" className="space-y-6">
            <IdeaQuoteTab 
              onQuoteApproved={(quote) => {
                setApprovedQuote(quote)
                setActiveTab("video")
              }} 
            />
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <VideoGenerationTab 
              approvedQuote={approvedQuote}
              onVideoGenerated={(videoUrl) => {
                setGeneratedVideo(videoUrl)
                setActiveTab("social")
              }}
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <SocialMediaTab 
              onPlatformsSelected={(platforms) => {
                setSelectedPlatforms(platforms)
                setActiveTab("providers")
              }}
            />
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <AIProvidersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}