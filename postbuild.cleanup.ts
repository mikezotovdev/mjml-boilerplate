import { existsSync, rmdirSync } from 'node:fs'
import { BUILD_DIRECTORY_NAME } from './build.const'

const removeBuildDirectory = () => {
  if (!existsSync(BUILD_DIRECTORY_NAME)) {
    return
  }

  rmdirSync(BUILD_DIRECTORY_NAME)
}

console.info('🗑️ Removing build directory...')
removeBuildDirectory()
console.info('✅ Directory removed.')
