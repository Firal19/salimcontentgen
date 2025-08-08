"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lightbulb, CheckCircle, RotateCcw } from "lucide-react"

interface IdeaQuoteTabProps {
  onQuoteApproved: (quote: string) => void
}

export function IdeaQuoteTab({ onQuoteApproved }: IdeaQuoteTabProps) {
  const [idea, setIdea] = useState("")
  const [philosopher, setPhilosopher] = useState("auto")
  const [quoteType, setQuoteType] = useState("philosophical")
  const [promptStyle, setPromptStyle] = useState("balanced")
  const [generatedQuote, setGeneratedQuote] = useState<string | null>(null)
  const [generatedAttribution, setGeneratedAttribution] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quoteApproved, setQuoteApproved] = useState(false)

  const philosophers = [
    { value: "auto", label: "Auto Select", category: "General" },
    { value: "AI Self-Teaching", label: "AI Self-Teaching", category: "Modern Thinkers" },
    { value: "seneca", label: "Seneca", category: "Western Philosophers" },
    { value: "marcus_aurelius", label: "Marcus Aurelius", category: "Western Philosophers" },
    { value: "epictetus", label: "Epictetus", category: "Western Philosophers" },
    { value: "socrates", label: "Socrates", category: "Western Philosophers" },
    { value: "plato", label: "Plato", category: "Western Philosophers" },
    { value: "aristotle", label: "Aristotle", category: "Western Philosophers" },
    { value: "spinoza", label: "Baruch Spinoza", category: "Western Philosophers" },
    { value: "nietzsche", label: "Friedrich Nietzsche", category: "Western Philosophers" },
    { value: "kierkegaard", label: "Søren Kierkegaard", category: "Western Philosophers" },
    { value: "confucius", label: "Confucius", category: "Eastern Philosophers" },
    { value: "lao_tzu", label: "Lao Tzu (Taoism)", category: "Eastern Philosophers" },
    { value: "buddha", label: "Buddha", category: "Eastern Philosophers" },
    { value: "sun_tzu", label: "Sun Tzu", category: "Eastern Philosophers" },
    { value: "zhuangzi", label: "Zhuangzi", category: "Eastern Philosophers" },
    { value: "avicenna", label: "Avicenna (Ibn Sina)", category: "Islamic Philosophers" },
    { value: "averroes", label: "Averroes (Ibn Rushd)", category: "Islamic Philosophers" },
    { value: "al_ghazali", label: "Al-Ghazali", category: "Islamic Philosophers" },
    { value: "al_farabi", label: "Al-Farabi", category: "Islamic Philosophers" },
    { value: "ibn_khaldun", label: "Ibn Khaldun", category: "Islamic Philosophers" },
    { value: "carl_jung", label: "Carl Jung", category: "Modern Thinkers" },
    { value: "viktor_frankl", label: "Viktor Frankl", category: "Modern Thinkers" },
    { value: "albert_camus", label: "Albert Camus", category: "Modern Thinkers" },
    { value: "jean_paul_sartre", label: "Jean-Paul Sartre", category: "Modern Thinkers" },
  ]

  const quoteTypes = [
    { value: "philosophical", label: "Traditional Philosophy", description: "Classic philosophical quotes and wisdom" },
    { value: "life_psychology", label: "Life & Psychology", description: "Modern insights about life and human psychology" },
    { value: "mixed", label: "Mixed Style", description: "Blend of philosophical depth and practical wisdom" }
  ]

  const promptStyles = [
    { value: "analytical", label: "Analytical & Deep", description: "Precise, intellectually rigorous, well-structured" },
    { value: "creative", label: "Creative & Poetic", description: "Imaginative, artistic, metaphorical" },
    { value: "balanced", label: "Balanced Approach", description: "Technical precision with creative expression" }
  ]

  const handleGenerateQuote = async () => {
    if (!idea.trim()) {
      alert("Please enter your idea or theme")
      return
    }

    setIsGenerating(true)
    try {
      // Get API key from localStorage
      const savedKeys = localStorage.getItem('aiApiKeys')
      const apiKeys = savedKeys ? JSON.parse(savedKeys) : {}
      
      console.log('Generating quote with:', { idea, philosopher, quoteType, promptStyle, hasApiKey: !!apiKeys.zai })
      
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          philosopher: philosopher === "auto" ? null : philosopher,
          quoteType,
          promptStyle,
          apiKey: apiKeys.zai || null
        })
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || `Failed to generate quote (${response.status})`)
      }
      
      const data = await response.json()
      console.log('API Response:', data)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (!data.quote || !data.attribution) {
        console.error('Invalid response data:', data)
        throw new Error('Invalid response from AI service')
      }
      
      setGeneratedQuote(data.quote)
      setGeneratedAttribution(data.attribution)
      setQuoteApproved(false)
    } catch (error) {
      console.error("Error generating quote:", error)
      alert(`Failed to generate quote: ${error.message}. Please check your API key and try again.`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApproveQuote = () => {
    if (generatedQuote) {
      setQuoteApproved(true)
      // Include attribution in the approved quote
      const fullQuote = generatedAttribution 
        ? `"${generatedQuote}" — ${generatedAttribution}`
        : generatedQuote
      onQuoteApproved(fullQuote)
    }
  }

  const handleRegenerate = () => {
    setGeneratedQuote(null)
    setGeneratedAttribution(null)
    setQuoteApproved(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Idea & Quote Generation</h2>
        <p className="text-muted-foreground">
          Enter your philosophical idea and let AI generate a meaningful quote
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Your Idea
            </CardTitle>
            <CardDescription>
              Enter your philosophical theme, concept, or idea
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your philosophical idea or theme here..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[120px]"
            />

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Philosopher Style</label>
                <Select value={philosopher} onValueChange={setPhilosopher}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(
                      philosophers.reduce((acc, phil) => {
                        if (!acc[phil.category]) acc[phil.category] = []
                        acc[phil.category].push(phil)
                        return acc
                      }, {} as Record<string, typeof philosophers>)
                    ).map(([category, items]) => (
                      <div key={category}>
                        <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                          {category}
                        </div>
                        {items.map((phil) => (
                          <SelectItem key={phil.value} value={phil.value}>
                            {phil.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Quote Type</label>
                <Select value={quoteType} onValueChange={setQuoteType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {quoteTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">AI Prompt Style</label>
                <Select value={promptStyle} onValueChange={setPromptStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {promptStyles.map((style) => (
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
              onClick={handleGenerateQuote} 
              disabled={isGenerating || !idea.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Quote...
                </>
              ) : (
                "Generate Quote"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Quote Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Quote</CardTitle>
            <CardDescription>
              AI-generated philosophical quote based on your idea
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedQuote ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <blockquote className="text-lg italic leading-relaxed">
                    "{generatedQuote}"
                  </blockquote>
                  {generatedAttribution && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      — {generatedAttribution}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {quoteTypes.find(t => t.value === quoteType)?.label}
                  </Badge>
                  <Badge variant="outline">
                    {promptStyles.find(s => s.value === promptStyle)?.label}
                  </Badge>
                </div>

                {!quoteApproved ? (
                  <div className="flex gap-2">
                    <Button onClick={handleApproveQuote} className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Quote
                    </Button>
                    <Button onClick={handleRegenerate} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                ) : (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Quote approved! You can now proceed to video generation.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter your idea and click "Generate Quote" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}