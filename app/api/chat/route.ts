import { NextRequest, NextResponse } from 'next/server'
import { askOpenAI, cannedReply } from '@/lib/chat'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, language } = body
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 })
    }

    // If no API key configured, return canned reply (still in English)
    let reply: string
    if (!process.env.OPENAI_API_KEY) {
      reply = cannedReply(message)
    } else {
      reply = await askOpenAI({ message, language })
    }

    return NextResponse.json({ success: true, reply })
  } catch (err: any) {
    console.error('Chat error:', err)
    return NextResponse.json({ success: false, error: err?.message || 'Failed to chat' }, { status: 500 })
  }
}
