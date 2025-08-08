import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { provider, style, quote, backgroundUrl, musicUrl, quality, duration, apiKey } = await request.json()

    if (!provider || !style || !quote || !quality || !duration) {
      return NextResponse.json(
        { error: 'Provider, style, quote, quality, and duration are required' },
        { status: 400 }
      )
    }

    // Create ZAI instance with API key if provided
    const zai = apiKey ? await ZAI.create({ apiKey }) : await ZAI.create()

    // Build prompt for video generation description
    let prompt = `Generate a detailed video production plan for a philosophical quote video.`

    if (style === 'cinematic') {
      prompt += ` Create a cinematic video with film-quality production, dramatic lighting, and professional camera work.`
    } else if (style === 'animated') {
      prompt += ` Create an animated video with motion graphics, dynamic transitions, and engaging visual effects.`
    } else if (style === 'minimalist') {
      prompt += ` Create a minimalist video with clean, simple design, subtle animations, and focused presentation.`
    } else if (style === 'artistic') {
      prompt += ` Create an artistic video with creative visuals, unique styling, and expressive cinematography.`
    }

    prompt += ` The video should be ${duration} seconds long and ${quality} quality.`

    if (backgroundUrl) {
      prompt += ` The video will incorporate background imagery.`
    }

    if (musicUrl) {
      prompt += ` The video will include background music and audio elements.`
    }

    prompt += ` The philosophical quote to be featured is: "${quote}"`

    prompt += ` Provide a detailed production plan including: visual style, animation timing, text placement, transitions, audio synchronization, and overall flow. Describe how the quote will be presented visually and audibly.`

    // Generate video production plan using ZAI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert video producer and director. Generate detailed video production plans that can be used to create professional philosophical quote videos.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    })

    const productionPlan = completion.choices[0]?.message?.content?.trim()

    if (!productionPlan) {
      throw new Error('Failed to generate video production plan')
    }

    // For now, we'll return a simulated video URL
    // In a real implementation, you would use this plan with a video generation API
    const videoUrl = `generated-video-${Date.now()}.mp4`

    return NextResponse.json({ 
      videoUrl,
      productionPlan,
      provider,
      style,
      quality,
      duration,
      quote
    })
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}