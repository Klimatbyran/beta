import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('production')
})

const env = envSchema.parse(process.env)

export default {
    BASE_URL:
  env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://api.klimatkollen.se/api'
}