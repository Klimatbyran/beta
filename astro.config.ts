import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import { type Options } from 'unplugin-icons'
import Icons from 'unplugin-icons/vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const customCollections: Options['customCollections'] = {
  local: (name) =>
    readFile(resolve('./src/icons', `${name}.svg`), {
      encoding: 'utf-8',
    }),
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server:
    process.env.NODE_ENV === 'development'
      ? undefined
      : { port: parseInt(process.env.PORT!) || 4321, host: true },
  integrations: [react(), svelte(), tailwind()],
  adapter: node({
    mode: 'standalone',
  }),
  devToolbar: { enabled: false },
  // NOTE: Temporary redirect (HTTP 302) to reduce risk of broken links once we implement these URLs as part of the Astro site.
  // This should only happen when running in the docker environment (which is the only time we pass in an explicit PORT env variable).
  redirects:
    process.env.NODE_ENV === 'development'
      ? {
          '/': '/foretag/x',
          '/foretag': '/foretag/x',
        }
      : {
          '/': 'https://klimatkollen.se',
          '/foretag': 'https://klimatkollen.se',
        },
  vite: {
    resolve: {
      alias: [
        { find: 'icons:astro', replacement: '~icons' },
        { find: 'icons:svelte', replacement: '~icons' },
      ],
    },
    plugins: [
      Icons({
        compiler: 'svelte',
        customCollections,
      }),
      Icons({
        compiler: 'astro',
        customCollections,
      }),
    ],
  },
})
