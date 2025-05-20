import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { BUILD_DIRECTORY_NAME, PUBLIC_DIRECTORY_NAME, TEMPLATE_VARIABLE_BY_NAME } from './build.const'
import { join } from 'node:path'
import { getOnlyFilePaths, getOnlyFiles } from './build.helpers.ts'

const copyPublicFilesIntoDist = () => {
  if (!existsSync(PUBLIC_DIRECTORY_NAME)) {
    throw new Error('Public directory does not exist.')
  }

  mkdirSync(BUILD_DIRECTORY_NAME)

  const files = getOnlyFiles(PUBLIC_DIRECTORY_NAME)

  for (const file of files) {
    const srcPath = join(PUBLIC_DIRECTORY_NAME, file.name)
    const destPath = join(BUILD_DIRECTORY_NAME, file.name)

    copyFileSync(srcPath, destPath)
  }
}

const interpolateFile = (content: string): string => {
  const entries = Object.entries(TEMPLATE_VARIABLE_BY_NAME)

  let result = content

  for (const [variable, replacer] of entries) {
    const regex = new RegExp(`{{\\s*${variable}\\s*}}`, 'g')

    result = result.replace(regex, replacer)
  }

  return result
}

const interpolateFiles = () => {
  copyPublicFilesIntoDist()
  const filePaths = getOnlyFilePaths(BUILD_DIRECTORY_NAME)

  for (const filePath of filePaths) {
    const content = readFileSync(filePath, 'utf8')
    const interpolatedContent = interpolateFile(content)

    writeFileSync(filePath, interpolatedContent, 'utf8')
  }
}

console.info('️✍️Interpolating template variables...')
interpolateFiles()
console.info('✅ Preview is built. Check the `dist` folder')
