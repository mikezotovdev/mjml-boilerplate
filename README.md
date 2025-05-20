# MJML Boilerplate

A modern MJML boilerplate for building responsive HTML email templates using **Bun**, **TypeScript**, and **Biome**. Includes built-in support for:

- ✅ MJML compilation
- 🧼 Minification via `html-minifier`
- 🧩 Mustache-style templating (e.g. `{{ colorBgDefault }}`)
- 🖥️ Local preview with variable interpolation
- ⚡ Superfast builds with Bun

![Preview of compiled email](./screenshots/compiled-preview.png)

> Example of a compiled MJML email using this boilerplate.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mikezotovdev/mjml-boilerplate.git
cd mjml-boilerplate
```

### 2. Install dependencies

```bash
bun install
```

### 3. Build

```bash
bun run build
```

> ⚠️ **Note:** The `build` command does **not interpolate variables** such as `{{ colorBgDefault }}` or `{{ firstName }}`. These placeholders are preserved in the final output (in `public/`) because the email content is expected to be injected server-side at runtime.

### 4. Preview with variables

```bash
bun run preview
```

> This command performs a local build with variables fully interpolated for visual testing and previewing emails.

---

## 📁 Project Structure

```text
.
├── .githooks/                    # Git hooks (e.g. pre-push)
├── biome.json                    # Biome formatter and linter config
├── build.const.ts                # Build-time constants
├── build.helpers.ts              # Build utilities
├── build.preview.ts              # Preview build (with interpolated variables)
├── build.templates.ts            # MJML -> HTML build logic
├── postbuild.cleanup.ts          # Post-build cleanup script
├── postbuild.minify.ts           # Minify HTML output
├── dist/                         # Preview output (interpolated HTML)
├── public/                       # Final output (minified, placeholders retained)
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── common/           # Shared image assets
│   │       └── subject/          # Subject-specific icons
│   ├── common/
│   │   ├── footer/               # Reusable footer components
│   │   ├── head/                 # MJML attributes, global attributes, banners, etc.
│   │   └── header/               # Reusable header component
│   └── templates/                # Your email templates go here (use folders). A few examples are already included.
│       ├── EmailConfirmation/
│       ├── PasswordChanged/
│       ├── PasswordReset/
│       └── SignUpWelcome/
```

---

## 🧩 Template Variables

Use Mustache-style syntax in your MJML:

```mjml
<mj-text>Hello, {{ firstName }}!</mj-text>
```

---

## 📚 Template Variable Reference

### Common variables

| Variable          | Meaning                                               | Example                                            |
| ----------------- | ----------------------------------------------------- |----------------------------------------------------|
| `appLink`         | Link to the app                                       | `https://app.example.com`                          |
| `supportTelegram` | Support telegram nickname (not a link, no "@" prefix) | `support`                                          |
| `supportEmail`    | Support email                                         | `support@example.com`                              |
| `firstName`       | First name of the user                                | `Billy`                                            |
| `userEmail`       | User email address                                    | `herrington@example.com`                           |
| `companyName`     | Company name                                          | `Gachi LTD`                                          |
| `link`            | Target action link (e.g. confirmation/reset link)     | `https://app.example.com/api/verify/email?code=69` |

---

### Color variables (global)

| Variable               | Meaning                                 | Example   |
|------------------------|-----------------------------------------| --------- |
| `colorTextDefault`     | Default text color                      | `#1A1A1A` |
| `colorTextDescription` | Description text color                  | `#6B7780` |
| `colorTextBrand`       | Brand text color                        | `#219b61` |
| `colorTextBrandDark`   | Brand dark text color (used for titles) | `#176B44` |
| `colorTextLink`        | Link text color                         | `#1B7F4C` |
| `colorTextButton`      | Button text color                       | `#FFFFFF` |
| `colorBgDefault`       | Default background color                | `#FFFFFF` |
| `colorBgBrand`         | Brand background color                  | `#219b61` |
| `colorBgButtonBrand`   | Brand button background color           | `#219b61` |
| `colorBorderDefault`   | Default border color                    | `#D0E4DA` |

---

### Icons, logos, illustrations

> Icons are stored in @2x resolution to ensure crisp display on retina screens.

| Variable                 | Icon size (width x height) | Example                |
|--------------------------|----------------------------|------------------------|
| `logoUrl`                | 142x48                     | `https://...image.png` |
| `emailIconUrl`           | 48x48                      | `https://...image.png` |
| `telegramLogoUrl`        | 48x48                      | `https://...image.png` |
| `subjectPasswordIconUrl` | 80x80                      | `https://...image.png` |
| `subjectSecurityIconUrl` | 80x80                      | `https://...image.png` |
| `subjectEmailIconUrl`    | 80x80                      | `https://...image.png` |
| `subjectWelcomeIconUrl`  | 80x80                      | `https://...image.png` |

---

## 📌 Template Usage Guidelines

Follow these best practices to ensure your email templates render correctly and build reliably:

- ⚠️ **Keep consistent file depth** for all `*.mjml` files. MJML cannot reliably resolve includes from files at different nesting levels.
- 🚫 **Never edit files manually in `public/`** — always build from source templates instead.
- 🧩 **Use `{{ variableName }}` syntax** for all dynamic content.
- ♻️ **Put shared MJML blocks in `src/common/`** to avoid duplication.
- 💡 **Wrap conditional logic in HTML comments** to prevent MJML from stripping unknown tags:
    ```mjml
    <!-- {{#if userName}} -->
    <mj-text>Hello, {{ userName }}!</mj-text>
    <!-- {{/if}} -->
    ```

---

## 🧪 Scripts

| Script                | Description                                                      |
|-----------------------|------------------------------------------------------------------|
| `bun run build`       | Clean, compile, and minify templates (no variables interpolated) |
| `bun run preview`     | Full build with live preview of injected variables               |
| `bun run fix`         | Format and lint using Biome                                      |
| `bun run clean-deps`  | Remove all dependencies and lockfile                             |
| `bun run setup-hooks` | Git pre-push hook setup                                          |

---

## 🛠 Tooling

- **Bun** – ultra-fast JS runtime
- **MJML** – email markup language
- **TypeScript** – type-safe scripting
- **Biome** – code formatter + linter
- **html-minifier** – for lightweight, production-ready output

---

## 🙋‍♂️ Author

Created by [Mike Zotov](https://mikezotov.dev)

[LinkedIn](https://www.linkedin.com/in/mike-zotov/) · [GitHub](https://github.com/mikezotovdev)

---

## ❤️ Support

If you find this project helpful, feel free to support it:

- **ERC-20/BNB/Base:** `0x117D11A2AD3D084b1aBC2a2F8be9531884936054`
- **Solana:** `7bYonr2pYa3Fs5vh21ngcAVHBUufGnUFp5mBposFMrxz`
- **Bitcoin:** `bc1qm2dydvexnrh7caqc4wz4lasaqwfz8zaez298kd`

---

## 📦 License

MIT © Mike Zotov

---

## 🌐 Links

- [MJML Documentation](https://documentation.mjml.io/)
- [MJML Plugin for WebStorm / JetBrains IDEs](https://plugins.jetbrains.com/plugin/16418-mjml-support)
- [MJML Plugin for VS Code](https://marketplace.visualstudio.com/items?itemName=mjmlio.vscode-mjml)
- [Bun Documentation](https://bun.sh/docs)
- [Biome](https://biomejs.dev/)
- [html-minifier](https://github.com/kangax/html-minifier)
