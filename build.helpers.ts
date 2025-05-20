import { type Dirent, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const getOnlyFiles = (dir: string): Dirent[] => {
  const entries = readdirSync(dir, { withFileTypes: true })

  return entries.filter((entry) => entry.isFile())
}

export const getOnlyFilePaths = (dir: string): string[] => {
  const files = getOnlyFiles(dir)

  return files.map((entry) => join(dir, entry.name))
}
