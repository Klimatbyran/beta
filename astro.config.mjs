import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: { port: parseInt(process.env.PORT) || 4321, host: true },
  integrations: [react(), tailwind()],
  adapter: node({
    mode: 'standalone',
  }),
})
