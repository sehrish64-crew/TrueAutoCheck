// Use the global `fetch` provided by Node/Next.js runtime instead of `node-fetch`.
type ChatRequest = {
  message: string
  conversationId?: string | null
  language?: string
}

export async function askOpenAI({ message, language }: ChatRequest) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY not configured')

  const url = 'https://api.openai.com/v1/chat/completions'
  // Add an instruction to reply in the user's language when provided
  const systemMessage = language && language !== 'en'
    ? `You are an assistant for an inspection site. Answer concisely and helpfully. Reply in ${language} when possible.`
    : 'You are an assistant for an inspection site. Answer concisely and helpfully.'

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: message }
    ],
    max_tokens: 500,
    temperature: 0.2,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenAI error: ${res.status} ${text}`)
  }

  const data = await res.json()
  const reply = data?.choices?.[0]?.message?.content
  return reply || 'Sorry, I could not generate a response.'
}

export function cannedReply(userMsg: string) {
  const lower = userMsg.toLowerCase()
  if (lower.includes('price') || lower.includes('cost')) return 'Our inspection report pricing starts at $9.99 — check Pricing page for details.'
  if (lower.includes('contact')) return 'You can reach us via the Contact Us page or email support@example.com.'
  if (lower.includes('order') || lower.includes('report')) return 'If you provide your order number I can look up the status for you (admin console needed).' 
  return "I'm here to help — please provide more details about what you need."
}
