import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { provider, style, quote, apiKey } = await request.json()

    if (!provider || !style) {
      return NextResponse.json(
        { error: 'Provider and style are required' },
        { status: 400 }
      )
    }

    // Create ZAI instance with API key if provided
    const zai = apiKey ? await ZAI.create({ apiKey }) : await ZAI.create()

    // Build prompt based on style and quote
    let prompt = `Create a philosophical background image`

    if (style === 'philosophical') {
      prompt += ` with deep, thoughtful, classical elements. Use rich colors, dramatic lighting, and symbolic imagery that represents wisdom and deep thinking.`
    } else if (style === 'modern') {
      prompt += ` with contemporary, clean, minimalist design. Use modern typography, geometric shapes, and a sophisticated color palette.`
    } else if (style === 'artistic') {
      prompt += ` with creative, expressive, and unique artistic style. Use bold colors, dynamic composition, and imaginative elements.`
    } else if (style === 'minimalist') {
      prompt += ` with simple, clean, and focused design. Use minimal elements, plenty of whitespace, and a restrained color palette.`
    }

    if (quote) {
      prompt += ` The image should visually represent this philosophical concept: "${quote}"`
    }

    prompt += ` Make it suitable as a background for text overlay. High quality, professional, and inspiring.`

    // Generate image using ZAI
    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1024x1024',
      quality: 'standard'
    })

    const imageData = response.data[0]?.base64

    if (!imageData) {
      throw new Error('Failed to generate image')
    }

    return NextResponse.json({ 
      imageUrl: `data:image/png;base64,${imageData}`,
      provider,
      style
    })
  } catch (error) {
    console.error('Error generating background image:', error)
    return NextResponse.json(
      { error: 'Failed to generate background image' },
      { status: 500 }
    )
  }
}