# @stackborg/ui-kits

> Tailwind CSS component library — theme-agnostic, extendable, production-ready.

[![npm version](https://img.shields.io/npm/v/@stackborg/ui-kits.svg)](https://www.npmjs.com/package/@stackborg/ui-kits)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

> **⚠️ Maintenance Disclaimer**
>
> This library is built and maintained by [Stackborg](https://github.com/stackborg) **exclusively for internal Stackborg products**. While it is open-source and freely available under the MIT license, **we are not obligated to provide support, fix bugs, or accept contributions from external users**.
>
> You are welcome to use, fork, and modify this library at your own risk. No guarantees are made regarding backward compatibility, timely updates, or fitness for your specific use case.
>
> **Use at your own risk. No external support will be provided.**

---

## Install

```bash
npm install @stackborg/ui-kits
```

**Peer dependencies:**
```bash
npm install react react-dom tailwindcss framer-motion
```

## Setup

Import the default theme in your app's CSS entry:

```css
@import "@stackborg/ui-kits/theme";
@import "tailwindcss";
```

## Usage

```tsx
import { Button, Badge, Input, Modal, Card } from "@stackborg/ui-kits";

function App() {
  return (
    <Card hoverable>
      <Card.Header>
        <Card.Title>License</Card.Title>
      </Card.Header>
      <Card.Body>
        <Input placeholder="Enter key..." />
      </Card.Body>
      <Card.Footer>
        <Button>Activate</Button>
        <Badge variant="success">Active</Badge>
      </Card.Footer>
    </Card>
  );
}
```

## Custom Theme

Override CSS variables in your project:

```css
:root {
  --ui-primary: 221 83% 53%;
  --ui-destructive: 0 84% 60%;
  --ui-radius: 0.75rem;
}

.dark {
  --ui-background: 222 47% 11%;
  --ui-foreground: 210 40% 98%;
}
```

## Components

### Atoms
`Button` · `Badge` · `Spinner` · `Skeleton` · `Separator` · `Avatar`

### Forms
`Label` · `Input` · `Textarea` · `Select` · `Checkbox` · `Switch`

### Composites
`Card` · `Modal` · `Drawer` · `Tooltip` · `Dropdown` · `Tabs`

## Development

```bash
npm run dev              # Storybook on localhost:6006
npm run build            # Library build (ESM + CJS + DTS)
npm run build:storybook  # Static storybook
```

## Publishing

Automated via GitHub Actions. To publish a new version:

```bash
# 1. Make your changes and commit
git add -A && git commit -m "feat: add new component"

# 2. Bump version
npm version patch   # bug fix (0.1.0 → 0.1.1)
npm version minor   # new feature (0.1.0 → 0.2.0)
npm version major   # breaking change (0.1.0 → 1.0.0)

# 3. Push with tags — GitHub Actions will auto-publish to npm
git push origin main --tags
```

## License

[MIT](./LICENSE) — © 2026 Stackborg. See [Maintenance Disclaimer](#maintenance-disclaimer) above.
