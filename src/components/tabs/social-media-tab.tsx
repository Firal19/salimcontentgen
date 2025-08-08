"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Share2, Clock, Globe, CheckCircle, Hash } from "lucide-react"

interface SocialMediaTabProps {
  onPlatformsSelected: (platforms: string[]) => void
}

export function SocialMediaTab({ onPlatformsSelected }: SocialMediaTabProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [autoPosting, setAutoPosting] = useState(false)
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "custom">("weekly")
  const [customInterval, setCustomInterval] = useState([7])
  const [selectedDay, setSelectedDay] = useState<string>("monday")
  const [selectedTime, setSelectedTime] = useState("09:00")
  const [timezone, setTimezone] = useState("UTC")
  const [startDate, setStartDate] = useState<Date>()
  const [weekendsOnly, setWeekendsOnly] = useState(false)
  const [businessHoursOnly, setBusinessHoursOnly] = useState(false)
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState("#philosophy #wisdom #lifelessons")
  const [includeQuote, setIncludeQuote] = useState(true)
  const [includeCredits, setIncludeCredits] = useState(true)

  const platforms = [
    { id: "tiktok", name: "TikTok", icon: "🎵", color: "bg-black" },
    { id: "telegram", name: "Telegram", icon: "✈️", color: "bg-blue-500" },
    { id: "instagram", name: "Instagram", icon: "📷", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "youtube", name: "YouTube", icon: "🎬", color: "bg-red-500" },
    { id: "facebook", name: "Facebook", icon: "👥", color: "bg-blue-600" },
    { id: "x", name: "X (Twitter)", icon: "🐦", color: "bg-gray-800" }
  ]

  const timezones = [
    { value: "UTC", label: "UTC" },
    { value: "US/Eastern", label: "US/Eastern" },
    { value: "US/Pacific", label: "US/Pacific" },
    { value: "Europe/London", label: "Europe/London" },
    { value: "Europe/Paris", label: "Europe/Paris" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo" }
  ]

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
  }

  const handleGenerateCaption = async () => {
    // Simulate AI caption generation
    const aiCaption = "Discover the profound wisdom of philosophy in this thought-provoking video. Let these words inspire your journey of self-discovery and personal growth. #philosophy #wisdom #mindfulness"
    setCaption(aiCaption)
  }

  const handleSaveAndContinue = () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform")
      return
    }
    onPlatformsSelected(selectedPlatforms)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Social Media & Scheduling</h2>
        <p className="text-muted-foreground">
          Configure your social media platforms and posting schedule
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Platform Selection
            </CardTitle>
            <CardDescription>
              Choose which social media platforms to post to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white`}>
                        <span className="text-lg">{platform.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedPlatforms.includes(platform.id) ? "Selected" : "Click to select"}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              ))}
            </div>

            {selectedPlatforms.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">
                  {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''} selected
                </span>
                <Badge variant="secondary">
                  {selectedPlatforms.map(p => platforms.find(pl => pl.id === p)?.name).join(', ')}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scheduling Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Scheduling Options
            </CardTitle>
            <CardDescription>
              Configure when and how often to post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-posting"
                checked={autoPosting}
                onCheckedChange={setAutoPosting}
              />
              <Label htmlFor="auto-posting">Enable Auto-Posting</Label>
            </div>

            {autoPosting && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {frequency === "custom" && (
                  <div>
                    <label className="text-sm font-medium">
                      Custom Interval: {customInterval[0]} day{customInterval[0] > 1 ? 's' : ''}
                    </label>
                    <Slider
                      value={customInterval}
                      onValueChange={setCustomInterval}
                      max={30}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                )}

                {frequency === "weekly" && (
                  <div>
                    <label className="text-sm font-medium">Day of Week</label>
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="weekends-only"
                      checked={weekendsOnly}
                      onCheckedChange={setWeekendsOnly}
                    />
                    <Label htmlFor="weekends-only">Weekends Only</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="business-hours"
                      checked={businessHoursOnly}
                      onCheckedChange={setBusinessHoursOnly}
                    />
                    <Label htmlFor="business-hours">Business Hours Only (9 AM - 5 PM)</Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Post Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Post Content
          </CardTitle>
          <CardDescription>
            Customize your social media post content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Caption</label>
            <Textarea
              placeholder="Write your caption here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] mt-2"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateCaption}
              className="mt-2"
            >
              Generate with AI
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium">Hashtags</label>
            <Input
              placeholder="#philosophy #wisdom #lifelessons"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="include-quote"
                checked={includeQuote}
                onCheckedChange={setIncludeQuote}
              />
              <Label htmlFor="include-quote">Include Quote in Post</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-credits"
                checked={includeCredits}
                onCheckedChange={setIncludeCredits}
              />
              <Label htmlFor="include-credits">Include AI Credits</Label>
            </div>
          </div>

          {selectedPlatforms.length > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Ready to post to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}. 
                {autoPosting && " Auto-posting is enabled with your selected schedule."}
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSaveAndContinue} className="w-full">
            Save & Continue to AI Providers
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}