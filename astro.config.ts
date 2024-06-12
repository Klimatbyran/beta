import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import Icons from 'unplugin-icons/vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server:
    process.env.NODE_ENV === 'production'
      ? { port: parseInt(import.meta.env.PORT) || 4321, host: true }
      : undefined,
  integrations: [react(), svelte(), tailwind()],
  adapter: node({
    mode: 'standalone',
  }),
  // NOTE: Temporary redirect (HTTP 302) to reduce risk of broken links once we implement these URLs as part of the Astro site.
  // This should only happen when running in the docker environment (which is the only time we pass in an explicit PORT env variable).
  redirects:
    process.env.NODE_ENV === 'production' && parseInt(import.meta.env.PORT)
      ? {
          '/': 'https://klimatkollen.se',
          '/foretag': 'https://klimatkollen.se',
        }
      : undefined,
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
        customCollections: {
          local: (name) =>
            readFile(resolve('./src/icons', `${name}.svg`), {
              encoding: 'utf-8',
            }),
        },
      }),
    ],
  },
})
