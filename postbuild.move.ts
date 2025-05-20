import { readdirSync, renameSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { BUILD_DIRECTORY_NAME, PUBLIC_DIRECTORY_NAME } from './build.const'

const moveBuildFilesToPublicDirectory = () => {
  if (!existsSync(PUBLIC_DIRECTORY_NAME)) {
    mkdirSync(PUBLIC_DIRECTORY_NAME)
  }

  const files = readdirSync(BUILD_DIRECTORY_NAME)

  for (const file of files) {
    renameSync(join(BUILD_DIRECTORY_NAME, file), join(PUBLIC_DIRECTORY_NAME, file))
  }
}

console.info('➡️ Moving files to public directory...')
moveBuildFilesToPublicDirectory()
console.info('✅ Files moved.')
