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

    console.log('=== Simple API Key Test Started ===')
    console.log('Provider:', provider)
    const cleanApiKey = apiKey.trim()
    console.log('API Key length:', cleanApiKey.length)
    console.log('API Key prefix:', cleanApiKey.substring(0, Math.min(8, cleanApiKey.length)) + '...')

    // First, try to create a simple ZAI instance without any API key
    // This will help us understand if the issue is with the SDK itself
    try {
      console.log('Testing ZAI.create() without API key...')
      const zaiNoKey = await ZAI.create()
      console.log('ZAI instance created without API key successfully')
      
      // Try a simple test with no API key
      try {
        const testCompletion = await zaiNoKey.chat.completions.create({
          messages: [
            { role: 'user', content: 'Hello' }
          ],
          max_tokens: 5
        })
        console.log('Test completion without API key successful:', testCompletion.choices[0]?.message?.content)
      } catch (testError) {
        console.log('Test completion without API key failed:', testError.message)
      }
    } catch (noKeyError) {
      console.error('Failed to create ZAI instance without API key:', noKeyError)
    }

    // Now test with the provided API key using the exact same method as generate-quote
    try {
      console.log('Testing ZAI.create({ apiKey })...')
      const zaiWithKey = await ZAI.create({ apiKey: cleanApiKey })
      console.log('ZAI instance created with API key successfully')
      
      // Test a simple completion
      try {
        const testCompletion = await zaiWithKey.chat.completions.create({
          messages: [
            { role: 'user', content: 'Test' }
          ],
          max_tokens: 5
        })
        const response = testCompletion.choices[0]?.message?.content?.trim()
        console.log('Test completion with API key successful:', response)
        
        return NextResponse.json({
          valid: true,
          message: 'API key test successful',
          response: response,
          method: 'ZAI.create({ apiKey })'
        })
      } catch (testError) {
        console.error('Test completion with API key failed:', testError)
        return NextResponse.json({
          valid: false,
          error: 'API key test failed during completion',
          details: testError.message,
          errorType: testError.name
        })
      }
    } catch (keyError) {
      console.error('Failed to create ZAI instance with API key:', keyError)
      
      // Try alternative initialization methods
      try {
        console.log('Trying alternative method: ZAI.create(apiKey)...')
        const zaiAlt = await ZAI.create(cleanApiKey)
        console.log('Alternative method successful')
        
        return NextResponse.json({
          valid: true,
          message: 'API key works with alternative method',
          method: 'ZAI.create(apiKey)'
        })
      } catch (altError) {
        console.error('Alternative method also failed:', altError)
        
        return NextResponse.json({
          valid: false,
          error: 'All initialization methods failed',
          details: keyError.message,
          errorType: keyError.name,
          alternativeError: altError.message
        })
      }
    }

  } catch (error) {
    console.error('Unexpected error during simple API key test:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test API key',
        details: error.message,
        errorType: error.name
      },
      { status: 500 }
    )
  }
}