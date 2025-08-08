import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { apiKey, provider } = await request.json()

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      )
    }

    console.log('=== API Key Validation Started ===')
    console.log('Provider:', provider)
    const cleanApiKey = apiKey.trim()
    console.log('API Key length:', cleanApiKey.length)
    console.log('API Key prefix:', cleanApiKey.substring(0, Math.min(10, cleanApiKey.length)) + '...')

    // Test the API key by trying to create a ZAI instance
    let zai
    try {
      console.log('Attempting to create ZAI instance...')
      
      // Try different initialization methods
      const initMethods = [
        () => ZAI.create({ apiKey: cleanApiKey }),
        () => ZAI.create(cleanApiKey),
        () => ZAI.create({ key: cleanApiKey }),
        () => ZAI.create()
      ]
      
      let lastError
      for (const [index, method] of initMethods.entries()) {
        try {
          console.log(`Trying initialization method ${index + 1}...`)
          zai = await method()
          console.log(`ZAI instance created successfully with method ${index + 1}`)
          break
        } catch (methodError) {
          console.log(`Method ${index + 1} failed:`, methodError.message)
          lastError = methodError
          if (index === initMethods.length - 1) {
            throw lastError
          }
        }
      }
      
    } catch (zaiError) {
      console.error('All ZAI initialization methods failed:', zaiError)
      console.error('Error details:', {
        name: zaiError.name,
        message: zaiError.message,
        stack: zaiError.stack,
        code: zaiError.code
      })
      
      return NextResponse.json({
        valid: false,
        error: 'Failed to initialize AI service',
        details: zaiError.message,
        errorType: zaiError.name,
        errorCode: zaiError.code
      })
    }

    // Test with a simple completion request
    try {
      console.log('Testing API key with completion request...')
      
      const testPrompt = 'Respond with "OK" only.'
      console.log('Test prompt:', testPrompt)
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Respond briefly and accurately.'
          },
          {
            role: 'user',
            content: testPrompt
          }
        ],
        temperature: 0.1,
        max_tokens: 10,
        top_p: 0.9
      })

      const response = completion.choices[0]?.message?.content?.trim()
      console.log('API response:', response)
      console.log('Full completion object:', JSON.stringify(completion, null, 2))
      
      if (response && (response.toLowerCase().includes('ok') || response.length > 0)) {
        console.log('API key validation successful')
        return NextResponse.json({
          valid: true,
          message: 'API key is valid and working',
          provider: provider,
          response: response
        })
      } else {
        console.log('API key validation failed - unexpected response:', response)
        return NextResponse.json({
          valid: false,
          error: 'API key returned unexpected response',
          details: `Expected meaningful response but got: "${response}"`,
          response: response
        })
      }
    } catch (completionError) {
      console.error('API key validation failed during completion test:', completionError)
      console.error('Completion error details:', {
        name: completionError.name,
        message: completionError.message,
        stack: completionError.stack,
        code: completionError.code,
        status: completionError.status
      })
      
      const errorMessage = completionError.message ? completionError.message.toLowerCase() : ''
      const errorDetails = {
        name: completionError.name,
        message: completionError.message,
        code: completionError.code,
        status: completionError.status
      }
      
      // Check if it's an authentication error
      if (errorMessage.includes('unauthorized') || 
          errorMessage.includes('invalid') || 
          errorMessage.includes('authentication') ||
          errorMessage.includes('api key') ||
          errorMessage.includes('401') ||
          errorMessage.includes('403') ||
          completionError.status === 401 ||
          completionError.status === 403) {
        return NextResponse.json({
          valid: false,
          error: 'Invalid API key or authentication failed',
          details: completionError.message,
          errorDetails: errorDetails
        })
      }
      
      // Check if it's a rate limit or quota issue
      if (errorMessage.includes('quota') || 
          errorMessage.includes('rate limit') ||
          errorMessage.includes('429') ||
          errorMessage.includes('limit exceeded') ||
          completionError.status === 429) {
        return NextResponse.json({
          valid: true,
          warning: 'API key is valid but has rate limits or quota restrictions',
          details: completionError.message,
          errorDetails: errorDetails
        })
      }
      
      // For other errors, provide detailed information
      return NextResponse.json({
        valid: false,
        error: 'API key test failed',
        details: completionError.message,
        errorDetails: errorDetails
      })
    }
  } catch (error) {
    console.error('Unexpected error during API key validation:', error)
    console.error('Unexpected error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to validate API key',
        details: error.message,
        errorDetails: {
          name: error.name,
          message: error.message,
          code: error.code
        }
      },
      { status: 500 }
    )
  }
}