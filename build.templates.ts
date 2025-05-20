import { type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import mjml2html from 'mjml'
import { BUILD_DIRECTORY_NAME, MJML_OPTIONS, TEMPLATES_DIRECTORY_NAME } from './build.const'

const transformContent = (content: string): string => {
  const { html } = mjml2html(content, MJML_OPTIONS)
  // If you want to validate your template, destructure `error` above and uncomment the line below
  // console.error(errors)

  return html
}

// Recursively read files from templates
const readFilesRecursively = (dir: string): string[] => {
  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true })
  let files: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      files = [...files, ...readFilesRecursively(fullPath)]

      continue
    }

    if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

const compileTemplates = () => {
  // Ensure dist directory exists
  if (!existsSync(BUILD_DIRECTORY_NAME)) {
    mkdirSync(BUILD_DIRECTORY_NAME)
  }

  const filePaths = readFilesRecursively(TEMPLATES_DIRECTORY_NAME)
  const IGNORED_FILE_NAMES: string[] = [
    /*'PasswordChanged'*/
  ]

  for (const filePath of filePaths) {
    const content = readFileSync(filePath, 'utf8')
    const fileName = basename(filePath, extname(filePath))

    if (IGNORED_FILE_NAMES.includes(fileName)) {
      console.warn(`⚠️ Skipped: ${fileName}.mjml is in ignore list`)

      continue
    }

    const fileNameHtml = `${fileName}.html`
    const distPath = join(BUILD_DIRECTORY_NAME, fileNameHtml)
    const transformed = transformContent(content)

    writeFileSync(distPath, transformed, 'utf8')
    console.info(`✅ Compiled: ${fileName}.html`)
  }
}

console.info('🔁 Compiling templates...')
compileTemplates()
console.info('✅ Templates compiled.')
