import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    console.log('=== Simple Package Test Started ===')
    
    // Test basic Node.js functionality
    const testResults = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
    
    // Test if we can access fs and path
    try {
      testResults.fs = 'OK'
    } catch (e) {
      testResults.fs = `Error: ${e.message}`
    }
    
    try {
      testResults.path = 'OK'
    } catch (e) {
      testResults.path = `Error: ${e.message}`
    }
    
    // Test ZAI package specifically
    try {
      console.log('Testing ZAI package require...')
      const packageJsonPath = path.join(process.cwd(), 'node_modules', 'z-ai-web-dev-sdk', 'package.json')
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
      const packageJson = JSON.parse(packageJsonContent)
      
      testResults.zaiPackage = {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description
      }
      console.log('ZAI package found:', packageJson.name, packageJson.version)
    } catch (e) {
      testResults.zaiPackage = `Error: ${e.message}`
      console.error('Failed to read ZAI package.json:', e)
    }
    
    // Check if node_modules exists
    try {
      const nodeModulesPath = path.join(process.cwd(), 'node_modules')
      const zaiPath = path.join(nodeModulesPath, 'z-ai-web-dev-sdk')
      
      testResults.nodeModules = {
        exists: fs.existsSync(nodeModulesPath),
        zaiExists: fs.existsSync(zaiPath)
      }
      
      if (testResults.nodeModules.zaiExists) {
        const zaiFiles = fs.readdirSync(zaiPath)
        testResults.zaiFiles = zaiFiles.slice(0, 10) // First 10 files
      }
    } catch (e) {
      testResults.nodeModules = `Error: ${e.message}`
    }
    
    return NextResponse.json({
      success: true,
      message: 'Package test completed',
      results: testResults
    })
    
  } catch (error) {
    console.error('Package test failed:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Package test failed',
        details: error.message
      },
      { status: 500 }
    )
  }
}