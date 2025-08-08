import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  console.log('=== Basic API Key Validation Started ===')
  
  try {
    const { provider, apiKey } = await request.json()
    
    console.log('Provider:', provider)
    console.log('API Key length:', apiKey?.length || 0)
    
    if (!apiKey) {
      return NextResponse.json({
        valid: false,
        error: 'No API key provided',
        details: 'API key is required'
      })
    }

    // Format checks
    console.log('API Key format check...')
    const formatIssues = {
      isEmpty: !apiKey || apiKey.trim().length === 0,
      isTooShort: apiKey.length < 10,
      hasInvalidChars: /[^\x20-\x7E]/.test(apiKey),
      looksLikeOpenAI: apiKey.startsWith('sk-') && !apiKey.startsWith('sk-ant-'),
      looksLikeBearer: apiKey.toLowerCase().startsWith('bearer '),
      hasLeadingTrailingSpaces: apiKey !== apiKey.trim()
    }

    console.log('Format check results:', formatIssues)

    if (formatIssues.isEmpty) {
      return NextResponse.json({
        valid: false,
        error: 'Empty API key',
        details: 'API key cannot be empty'
      })
    }

    if (formatIssues.hasLeadingTrailingSpaces) {
      return NextResponse.json({
        valid: false,
        error: 'Format issue',
        details: 'API key has leading or trailing spaces',
        suggestion: 'Remove spaces from the beginning and end of your API key'
      })
    }

    if (formatIssues.hasInvalidChars) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid characters',
        details: 'API key contains invalid characters',
        suggestion: 'Make sure you copied the entire API key correctly'
      })
    }

    const cleanApiKey = apiKey.trim()

    // Provider-specific validation
    if (provider === 'anthropic' || provider === 'zai') {
      console.log('Attempting to validate Claude/Anthropic API key...')
      
      // Check format
      if (!cleanApiKey.startsWith('sk-ant-')) {
        if (cleanApiKey.startsWith('sk-')) {
          return NextResponse.json({
            valid: false,
            error: 'Wrong API key format',
            details: 'This looks like an OpenAI API key, not a Claude API key',
            suggestion: 'Claude API keys start with "sk-ant-". Get yours from https://console.anthropic.com/settings/keys',
            formatChecks: formatIssues
          })
        }
        
        console.warn('API key does not start with sk-ant-, but will try anyway')
      }

      try {
        const anthropic = new Anthropic({
          apiKey: cleanApiKey,
        })

        // Test the API key with a minimal request
        console.log('Testing Claude API key with a simple request...')
        const response = await anthropic.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 10,
          messages: [
            {
              role: 'user',
              content: 'Test'
            }
          ]
        })

        console.log('Claude API test successful')
        return NextResponse.json({
          valid: true,
          message: 'Claude API key is valid',
          provider: 'anthropic',
          formatChecks: formatIssues
        })

      } catch (error: any) {
        console.error('Claude API validation failed:', error)
        
        if (error.status === 401) {
          return NextResponse.json({
            valid: false,
            error: 'Invalid API key',
            details: 'Authentication failed',
            suggestion: 'Check your Claude API key at https://console.anthropic.com/settings/keys',
            formatChecks: formatIssues
          })
        }

        if (error.status === 400 && error.message?.includes('credit balance')) {
          return NextResponse.json({
            valid: true,
            warning: 'API key is valid but account has no credits',
            details: 'Your Claude API key is valid but your account needs credits',
            suggestion: 'Add credits at https://console.anthropic.com/settings/plans',
            formatChecks: formatIssues
          })
        }

        if (error.status === 429) {
          return NextResponse.json({
            valid: false,
            error: 'Rate limited',
            details: 'Too many requests',
            suggestion: 'Your API key is valid but rate limited. Wait a moment and try again.',
            formatChecks: formatIssues
          })
        }

        return NextResponse.json({
          valid: false,
          error: 'Validation failed',
          details: error.message || 'Unknown error',
          errorCode: error.status || 'unknown',
          formatChecks: formatIssues
        })
      }
    }

    // For other providers
    return NextResponse.json({
      valid: false,
      error: 'Unsupported provider',
      details: `Provider "${provider}" is not yet supported`,
      suggestion: 'Currently only Claude/Anthropic API keys are supported'
    })

  } catch (error: any) {
    console.error('Validation error:', error)
    return NextResponse.json({
      valid: false,
      error: 'Validation error',
      details: error.message || 'Unknown error occurred'
    })
  }
}