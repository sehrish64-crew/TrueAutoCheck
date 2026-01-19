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
  
  // FAQ responses for vehicle inspection questions
  if (lower.includes('what is a vehicle inspection') || 
      (lower.includes('vehicle') && lower.includes('inspection') && lower.includes('what'))) {
    return 'A vehicle inspection is a process where a car\'s condition is checked, including engine, brakes, suspension, body, and documents, to provide the buyer with an accurate overview of the vehicle.'
  }
  
  if (lower.includes('what is checked') || 
      (lower.includes('checked') && lower.includes('inspection'))) {
    return 'During an inspection, the engine performance, accident history, paint condition, brakes, tyres, suspension, electrical system, and mileage are verified.'
  }
  
  if (lower.includes('how long') && lower.includes('report')) {
    return 'Usually, a detailed digital inspection report is provided to the customer within 24 hours after the inspection is completed.'
  }
  
  if (lower.includes('book') || 
      (lower.includes('appointment') && lower.includes('inspection'))) {
    return 'Yes, it is recommended to book an appointment in advance to ensure the inspection is carried out properly and on time.'
  }
  
  // Original responses
  if (lower.includes('price') || lower.includes('cost')) return 'Our inspection report pricing starts at $9.99 — check Pricing page for details.'
  if (lower.includes('contact')) return 'You can reach us via the Contact Us page or email info@trueautocheck.com.'
  if (lower.includes('order') || lower.includes('report')) return 'If you provide your order number I can look up the status for you (admin console needed).' 
  
  // Default response for unanswered questions with contact support info
  return "I'm here to help, but I don't have the answer to that question right now. Please reach out to our support team directly:\n\n📧 Email: info@trueautocheck.com\n🌐 Contact Us: https://trueautocheck.com/contact-us\n\nOur team will be happy to assist you!"
}
