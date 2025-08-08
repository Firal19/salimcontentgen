import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Comprehensive API Key Test Started ===')
    
    const { apiKey, provider } = await request.json()
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 })
    }

    const cleanApiKey = apiKey.trim()
    console.log('Testing API Key:')
    console.log('- Length:', cleanApiKey.length)
    console.log('- Prefix:', cleanApiKey.substring(0, Math.min(10, cleanApiKey.length)) + '...')
    console.log('- Contains spaces:', /\s/.test(cleanApiKey))
    console.log('- Contains special chars:', /[^a-zA-Z0-9]/.test(cleanApiKey))

    const results = {
      format: {
        length: cleanApiKey.length,
        hasSpaces: /\s/.test(cleanApiKey),
        hasSpecialChars: /[^a-zA-Z0-9]/.test(cleanApiKey),
        startsWithSk: cleanApiKey.startsWith('sk-'),
        looksValid: cleanApiKey.length >= 8 && !/\s/.test(cleanApiKey)
      },
      tests: []
    }

    // Test 1: Basic ZAI SDK import
    try {
      console.log('Test 1: ZAI SDK import...')
      console.log('- ZAI type:', typeof ZAI)
      console.log('- ZAI methods:', Object.keys(ZAI))
      results.tests.push({ name: 'SDK Import', success: true, details: 'Import successful' })
    } catch (error) {
      console.error('Test 1 failed:', error)
      results.tests.push({ name: 'SDK Import', success: false, error: error.message })
      return NextResponse.json(results)
    }

    // Test 2: ZAI.create without API key
    try {
      console.log('Test 2: ZAI.create() without API key...')
      const zaiNoKey = await ZAI.create()
      console.log('- Instance created successfully')
      
      // Test a simple call
      try {
        const testCompletion = await zaiNoKey.chat.completions.create({
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 5
        })
        const response = testCompletion.choices[0]?.message?.content?.trim()
        console.log('- Test call successful:', response)
        results.tests.push({ 
          name: 'ZAI without API Key', 
          success: true, 
          details: 'Instance created and test call successful',
          response: response 
        })
      } catch (callError) {
        console.log('- Test call failed:', callError.message)
        results.tests.push({ 
          name: 'ZAI without API Key', 
          success: true, 
          warning: 'Instance created but test call failed',
          error: callError.message 
        })
      }
    } catch (error) {
      console.error('Test 2 failed:', error)
      results.tests.push({ 
        name: 'ZAI without API Key', 
        success: false, 
        error: error.message,
        stack: error.stack 
      })
    }

    // Test 3: Different initialization methods with API key
    const methods = [
      { name: 'ZAI.create({ apiKey })', fn: () => ZAI.create({ apiKey: cleanApiKey }) },
      { name: 'ZAI.create(apiKey)', fn: () => ZAI.create(cleanApiKey) },
      { name: 'ZAI.create({ key: apiKey })', fn: () => ZAI.create({ key: cleanApiKey }) }
    ]

    for (const method of methods) {
      try {
        console.log(`Test 3.${methods.indexOf(method) + 1}: ${method.name}...`)
        const zaiWithKey = await method.fn()
        console.log('- Instance created successfully')
        
        // Test a simple call
        try {
          const testCompletion = await zaiWithKey.chat.completions.create({
            messages: [{ role: 'user', content: 'Test' }],
            max_tokens: 5
          })
          const response = testCompletion.choices[0]?.message?.content?.trim()
          console.log('- Test call successful:', response)
          
          results.tests.push({ 
            name: method.name, 
            success: true, 
            details: 'Instance created and test call successful',
            response: response 
          })
        } catch (callError) {
          console.error('- Test call failed:', callError)
          results.tests.push({ 
            name: method.name, 
            success: true, 
            warning: 'Instance created but test call failed',
            error: callError.message,
            errorType: callError.name 
          })
        }
      } catch (methodError) {
        console.error(`- ${method.name} failed:`, methodError)
        results.tests.push({ 
          name: method.name, 
          success: false, 
          error: methodError.message,
          errorType: methodError.name,
          code: methodError.code,
          stack: methodError.stack 
        })
      }
    }

    // Test 4: Network connectivity
    try {
      console.log('Test 4: Network connectivity...')
      const testResponse = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      })
      console.log('- Network test status:', testResponse.status)
      results.tests.push({ 
        name: 'Network Connectivity', 
        success: true, 
        details: `HTTP ${testResponse.status}` 
      })
    } catch (networkError) {
      console.error('Test 4 failed:', networkError)
      results.tests.push({ 
        name: 'Network Connectivity', 
        success: false, 
        error: networkError.message 
      })
    }

    // Test 5: Environment check
    console.log('Test 5: Environment variables...')
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      DATABASE_URL: process.env.DATABASE_URL ? '***set***' : 'not set'
    }
    console.log('- Environment:', envVars)
    results.tests.push({ 
      name: 'Environment Check', 
      success: true, 
      details: envVars 
    })

    // Summary
    const successfulTests = results.tests.filter(t => t.success).length
    const totalTests = results.tests.length
    
    results.summary = {
      totalTests,
      successfulTests,
      failedTests: totalTests - successfulTests,
      overallSuccess: successfulTests > 0
    }

    console.log('=== Comprehensive Test Complete ===')
    return NextResponse.json(results)

  } catch (error) {
    console.error('Comprehensive test failed:', error)
    return NextResponse.json(
      { 
        error: 'Comprehensive test failed',
        details: error.message,
        stack: error.stack 
      },
      { status: 500 }
    )
  }
}