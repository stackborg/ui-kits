# @stackborg/ui-kits

> Tailwind CSS component library — theme-agnostic, extendable, production-ready.

## Install

```bash
npm install @stackborg/ui-kits
```

**Peer dependencies:**
```bash
npm install react react-dom tailwindcss
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
  --ui-primary: 221 83% 53%;       /* Blue primary */
  --ui-destructive: 0 84% 60%;     /* Red danger */
  --ui-radius: 0.75rem;            /* Rounder corners */
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
npm run dev          # Storybook on localhost:6006
npm run build        # Library build (ESM + CJS + DTS)
npm run build:storybook  # Static storybook
```

## License

MIT
