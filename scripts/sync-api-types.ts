import { writeFile, rm } from 'fs/promises'
import { resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

import apiConfig from '@/config/api'

const openAPIJSON = await fetch(`${apiConfig.BASE_URL}/openapi.json`).then(
  (res) => res.text(),
)

console.dir(apiConfig.BASE_URL, { depth: 2, colors: true })

const jsonFilePath = resolve(
  import.meta.dirname,
  '../src/lib/api/openapi.json',
)

await rm(jsonFilePath, { force: true })

await writeFile(jsonFilePath, openAPIJSON, 'utf-8')

await promisify(exec)(
  `npx openapi-typescript ${jsonFilePath} -o ./src/lib/api/v1.d.ts`,
).then(({ stderr, stdout }) => {
  console.log(stdout)

  if (stderr) {
    console.error(stderr)
  }
})

console.log('✅ OpenAPI types synced')
