import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Claude/Anthropic API Debug Test Started ===')
    
    // Parse request body to get API key if provided
    const body = await request.json().catch(() => ({}))
    const { apiKey, provider } = body
    
    console.log('Debug request - Provider:', provider, 'Has API key:', !!apiKey)
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'No API key provided',
        details: 'API key is required for testing'
      })
    }

    const cleanApiKey = apiKey.trim()
    console.log('API key length:', cleanApiKey.length)
    console.log('API key format check...')

    // Check API key format
    const formatChecks = {
      startsWithSkAnt: cleanApiKey.startsWith('sk-ant-'),
      startsWithSk: cleanApiKey.startsWith('sk-'),
      length: cleanApiKey.length,
      hasSpaces: cleanApiKey.includes(' '),
      hasNewlines: cleanApiKey.includes('\n')
    }

    console.log('Format checks:', formatChecks)

    if (!formatChecks.startsWithSkAnt) {
      if (formatChecks.startsWithSk) {
        return NextResponse.json({
          success: false,
          error: 'Wrong API key format',
          details: 'This looks like an OpenAI API key, not a Claude API key',
          suggestion: 'Claude API keys start with "sk-ant-"',
          formatChecks
        })
      }
      
      return NextResponse.json({
        success: false,
        error: 'Invalid API key format',
        details: 'Claude API keys should start with "sk-ant-"',
        suggestion: 'Get your Claude API key from https://console.anthropic.com/settings/keys',
        formatChecks
      })
    }

    // Test with Anthropic SDK
    try {
      console.log('Creating Anthropic client...')
      const anthropic = new Anthropic({
        apiKey: cleanApiKey,
      })

      console.log('Testing API key with minimal request...')
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'Say "test"'
          }
        ]
      })

      console.log('Claude API test successful')
      const content = response.content[0]?.type === 'text' ? response.content[0].text : null

      return NextResponse.json({
        success: true,
        message: 'Claude API key is valid and working',
        testResponse: content,
        model: response.model,
        usage: response.usage,
        formatChecks
      })

    } catch (error: any) {
      console.error('Claude API test failed:', error)
      
      let errorDetails = {
        message: error.message,
        status: error.status,
        type: error.error?.type || error.name
      }

      if (error.status === 401) {
        return NextResponse.json({
          success: false,
          error: 'Authentication failed',
          details: 'Invalid Claude API key',
          suggestion: 'Check your API key at https://console.anthropic.com/settings/keys',
          errorDetails,
          formatChecks
        })
      }

      if (error.status === 400 && error.message?.includes('credit balance')) {
        return NextResponse.json({
          success: true,
          warning: 'API key is valid but account has no credits',
          details: 'Your Claude API key works but you need to add credits',
          suggestion: 'Add credits at https://console.anthropic.com/settings/plans',
          errorDetails,
          formatChecks
        })
      }

      if (error.status === 429) {
        return NextResponse.json({
          success: true,
          warning: 'API key is valid but rate limited',
          details: 'Your Claude API key works but you hit a rate limit',
          suggestion: 'Wait a moment and try again',
          errorDetails,
          formatChecks
        })
      }

      return NextResponse.json({
        success: false,
        error: 'API test failed',
        details: error.message || 'Unknown error',
        errorDetails,
        formatChecks
      })
    }

  } catch (error: any) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      success: false,
      error: 'Debug test failed',
      details: error.message || 'Unknown error occurred'
    })
  }
}