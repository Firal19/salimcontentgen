import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { provider, genre, mood, duration, quote, apiKey } = await request.json()

    if (!provider || !genre || !mood || !duration) {
      return NextResponse.json(
        { error: 'Provider, genre, mood, and duration are required' },
        { status: 400 }
      )
    }

    // Create ZAI instance with API key if provided
    const zai = apiKey ? await ZAI.create({ apiKey }) : await ZAI.create()

    // Build prompt for music generation
    let prompt = `Generate a musical composition description for a philosophical quote video.`

    if (genre === 'ambient') {
      prompt += ` Create ambient, atmospheric background music with ethereal textures and subtle melodies.`
    } else if (genre === 'classical') {
      prompt += ` Create classical-style music with orchestral elements, sophisticated arrangements, and timeless elegance.`
    } else if (genre === 'electronic') {
      prompt += ` Create electronic music with modern synthesizers, digital textures, and contemporary production.`
    } else if (genre === 'acoustic') {
      prompt += ` Create acoustic music with organic instruments, natural sounds, and warm, intimate feel.`
    }

    if (mood === 'contemplative') {
      prompt += ` The mood should be thoughtful, reflective, and introspective, encouraging deep thinking.`
    } else if (mood === 'inspirational') {
      prompt += ` The mood should be uplifting, motivating, and emotionally resonant, inspiring positive action.`
    } else if (mood === 'mysterious') {
      prompt += ` The mood should be enigmatic, intriguing, and thought-provoking, creating a sense of wonder.`
    } else if (mood === 'peaceful') {
      prompt += ` The mood should be calm, serene, and tranquil, promoting relaxation and inner peace.`
    }

    prompt += ` The duration should be approximately ${duration} seconds.`

    if (quote) {
      prompt += ` The music should complement and enhance this philosophical quote: "${quote}"`
    }

    prompt += ` Describe the musical elements, instruments, tempo, key, and overall structure in detail.`

    // Generate music description using ZAI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert music composer and producer. Generate detailed music composition descriptions that can be used to create actual music.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    })

    const musicDescription = completion.choices[0]?.message?.content?.trim()

    if (!musicDescription) {
      throw new Error('Failed to generate music description')
    }

    // For now, we'll return a simulated music URL
    // In a real implementation, you would use this description with a music generation API
    const musicUrl = `generated-music-${Date.now()}.mp3`

    return NextResponse.json({ 
      musicUrl,
      musicDescription,
      provider,
      genre,
      mood,
      duration
    })
  } catch (error) {
    console.error('Error generating music:', error)
    return NextResponse.json(
      { error: 'Failed to generate music' },
      { status: 500 }
    )
  }
}