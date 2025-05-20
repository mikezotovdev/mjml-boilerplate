import { minify } from 'html-minifier'
import { HTML_MINIFIER_OPTIONS, PUBLIC_DIRECTORY_NAME } from './build.const'
import { readFileSync, writeFileSync } from 'node:fs'
import { getOnlyFilePaths } from './build.helpers.ts'

const transformContent = (content: string): string => minify(content, HTML_MINIFIER_OPTIONS)

const minifyTemplates = () => {
  const filePaths = getOnlyFilePaths(PUBLIC_DIRECTORY_NAME)

  for (const filePath of filePaths) {
    const content = readFileSync(filePath, 'utf8')
    const minified = transformContent(content)

    writeFileSync(filePath, minified, 'utf8')
  }
}

console.info('🤐 Minifying compiled files...')
minifyTemplates()
console.info('✅ Minification completed.')
