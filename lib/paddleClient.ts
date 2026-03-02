import Paddle from '@paddle/paddle-node'

const apiKey = process.env.PADDLE_API_KEY
const environment = (process.env.NEXT_PUBLIC_PADDLE_ENV || 'production') === 'production' ? 'live' : 'sandbox'

if (!apiKey) {
  console.warn('[paddleClient] Missing PADDLE_API_KEY in environment - server calls will fail')
}

export const paddle = new Paddle({ apiKey, environment })

export default paddle
