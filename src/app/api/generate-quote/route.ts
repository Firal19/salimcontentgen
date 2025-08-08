import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    const { idea, philosopher, quoteType, promptStyle, apiKey } = await request.json()

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea is required' },
        { status: 400 }
      )
    }

    console.log('Quote generation request:', { idea, philosopher, quoteType, promptStyle, hasApiKey: !!apiKey })

    // Create Anthropic client with API key
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required for Claude' },
        { status: 400 }
      )
    }

    const cleanApiKey = apiKey.trim()
    
    // Check if it's a Claude API key (starts with sk-ant-)
    if (!cleanApiKey.startsWith('sk-ant-')) {
      console.warn('API key does not look like a Claude API key (should start with sk-ant-)')
    }

    const anthropic = new Anthropic({
      apiKey: cleanApiKey,
    })

    // Build system prompt based on parameters
    let systemPrompt = `You are a philosophical quote generator. Create a meaningful, insightful quote based on the user's idea. The quote should be original, thoughtful, and profound. Do not use famous quotes or copy existing quotes. Create something new and unique based on the given idea.`

    if (philosopher && philosopher !== "AI Self-Teaching") {
      systemPrompt += ` Generate the quote in the style of ${philosopher}. Capture their philosophical perspective and way of thinking.`
    } else if (philosopher === "AI Self-Teaching") {
      systemPrompt += ` Generate a quote that demonstrates AI self-reflection and learning about philosophical concepts.`
    }

    if (quoteType === 'philosophical') {
      systemPrompt += ` The quote should be deeply philosophical, thought-provoking, and address fundamental questions about existence, knowledge, values, reason, mind, and language.`
    } else if (quoteType === 'life_psychology') {
      systemPrompt += ` The quote should focus on modern life lessons, psychological insights, human behavior, and personal growth.`
    } else if (quoteType === 'mixed') {
      systemPrompt += ` The quote should blend philosophical depth with practical life wisdom and psychological insights.`
    }

    if (promptStyle === 'analytical') {
      systemPrompt += ` Make the quote precise, intellectually rigorous, well-structured, and logically sound. Use clear, analytical language.`
    } else if (promptStyle === 'creative') {
      systemPrompt += ` Make the quote imaginative, artistic, metaphorical, and expressive. Use creative language and vivid imagery.`
    } else if (promptStyle === 'balanced') {
      systemPrompt += ` Balance technical precision with creative expression. Make the quote both intellectually sound and artistically beautiful.`
    }

    systemPrompt += ` IMPORTANT: You must respond with a valid JSON object only, no other text. The JSON must have exactly two fields: "quote" (string containing the philosophical quote) and "attribution" (string containing who said it - use the philosopher's name or "AI Self-Teaching"). Do not include the word "json" or any other text outside the JSON object. Example format: {"quote": "The philosophical quote here", "attribution": "Name of philosopher"}`

    // Build user prompt
    let userPrompt = `Generate a unique philosophical quote based on this idea: ${idea}`

    if (philosopher && philosopher !== "AI Self-Teaching") {
      userPrompt += ` Channel the philosophical style and perspective of ${philosopher}.`
    }

    // Generate quote using Claude
    let completion
    try {
      console.log('Starting quote generation with Claude...')
      completion = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307', // Using Haiku for faster response
        max_tokens: 150,
        temperature: promptStyle === 'creative' ? 0.95 : promptStyle === 'analytical' ? 0.4 : 0.8,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
      console.log('Claude completion request successful')
    } catch (completionError: any) {
      console.error('Failed to generate completion:', completionError)
      if (completionError.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your Claude API key.' },
          { status: 401 }
        )
      }
      throw new Error(`Failed to generate AI response: ${completionError.message}`)
    }

    const response = completion.content[0]?.type === 'text' ? completion.content[0].text.trim() : null
    console.log('Raw AI response:', response)

    if (!response) {
      console.error('No response content from AI')
      throw new Error('AI returned empty response')
    }

    // Parse the response to extract JSON
    let quoteData
    try {
      // Find the JSON object in the response - it might have extra text around it
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        quoteData = JSON.parse(jsonMatch[0])
      } else {
        // If no JSON found, try parsing the whole response
        quoteData = JSON.parse(response)
      }
      console.log('Parsed quote data:', quoteData)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      console.error('Response was:', response)
      
      // Fallback: try to extract quote from the response text
      const fallbackQuote = response.replace(/^["']|["']$/g, '').trim()
      quoteData = {
        quote: fallbackQuote,
        attribution: philosopher || "AI Self-Teaching"
      }
      console.log('Using fallback quote extraction:', quoteData)
    }

    // Validate the response structure
    if (!quoteData.quote) {
      console.error('Invalid response structure - missing quote')
      throw new Error('AI response missing required quote field')
    }

    // Ensure attribution exists
    if (!quoteData.attribution) {
      quoteData.attribution = philosopher || "AI Self-Teaching"
    }

    return NextResponse.json(quoteData)

  } catch (error) {
    console.error('Error generating quote:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate quote' },
      { status: 500 }
    )
  }
}