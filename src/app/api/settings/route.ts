import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return default settings
    // In a real implementation, you would fetch from the database based on the authenticated user
    
    const settings = {
      zaiApiKey: '',
      openaiApiKey: '',
      stabilityApiKey: '',
      elevenLabsApiKey: '',
      runwayApiKey: '',
      replicateApiKey: '',
      googleDriveApiKey: '',
      storageProvider: 'local',
      storagePath: './uploads',
      ffmpegPath: '/usr/local/bin/ffmpeg',
      defaultQuoteType: 'philosophical',
      defaultPromptStyle: 'balanced',
      defaultVideoQuality: 'medium'
    }

    return NextResponse.json(settings)

  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      zaiApiKey,
      openaiApiKey,
      stabilityApiKey,
      elevenLabsApiKey,
      runwayApiKey,
      replicateApiKey,
      googleDriveApiKey,
      storageProvider,
      storagePath,
      ffmpegPath,
      defaultQuoteType,
      defaultPromptStyle,
      defaultVideoQuality
    } = await request.json()

    // For demo purposes, just return success
    // In a real implementation, you would save to the database
    
    const updatedSettings = {
      zaiApiKey: zaiApiKey || '',
      openaiApiKey: openaiApiKey || '',
      stabilityApiKey: stabilityApiKey || '',
      elevenLabsApiKey: elevenLabsApiKey || '',
      runwayApiKey: runwayApiKey || '',
      replicateApiKey: replicateApiKey || '',
      googleDriveApiKey: googleDriveApiKey || '',
      storageProvider: storageProvider || 'local',
      storagePath: storagePath || './uploads',
      ffmpegPath: ffmpegPath || '/usr/local/bin/ffmpeg',
      defaultQuoteType: defaultQuoteType || 'philosophical',
      defaultPromptStyle: defaultPromptStyle || 'balanced',
      defaultVideoQuality: defaultVideoQuality || 'medium',
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      message: 'Settings saved successfully',
      settings: updatedSettings
    })

  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}