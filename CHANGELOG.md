# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-04-02

### Changed
- **Drawer**: Rewrote with `framer-motion` `AnimatePresence` for smooth enter AND exit transitions (spring open, tween close)
- **Drawer**: Backdrop now fades in/out smoothly with subtle blur instead of instant mount/unmount
- **Drawer**: `DrawerContentProps` simplified — accepts `className`, `width`, and `children`

### Added
- `framer-motion` as a peer dependency (`>=11`)

---

## [0.1.0] - 2026-03-27

### Added
- **Atoms**: Button, Badge, Spinner, Skeleton, Separator, Avatar
- **Forms**: Label, Input, Textarea, Select, Checkbox, Switch
- **Composites**: Card, Modal, Drawer, Tooltip, Dropdown, Tabs
- CSS variable-based theming system with light/dark mode support
- Storybook documentation with 80+ stories
- ESM + CJS dual output with TypeScript declarations
- CVA (Class Variance Authority) variant pattern for all components
