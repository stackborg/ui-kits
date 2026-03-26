/**
 * @stackborg/ui-kits — Public API
 *
 * All components are exported from here.
 * Consumers import like: import { Button, Badge, Input, Modal } from "@stackborg/ui-kits";
 */

// ── Utilities ──
export { cn } from "./lib/utils";

// ── Atoms ──
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";

export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";

export { Spinner, spinnerVariants } from "./components/spinner";
export type { SpinnerProps } from "./components/spinner";

export { Skeleton, skeletonVariants } from "./components/skeleton";
export type { SkeletonProps } from "./components/skeleton";

export { Separator, separatorVariants } from "./components/separator";
export type { SeparatorProps } from "./components/separator";

export { Avatar, avatarVariants } from "./components/avatar";
export type { AvatarProps } from "./components/avatar";

// ── Form Elements ──
export { Label } from "./components/label";
export type { LabelProps } from "./components/label";

export { Input, inputVariants } from "./components/input";
export type { InputProps } from "./components/input";

export { Textarea, textareaVariants } from "./components/textarea";
export type { TextareaProps } from "./components/textarea";

export { Select, selectVariants } from "./components/select";
export type { SelectProps, SelectOption } from "./components/select";

export { Checkbox } from "./components/checkbox";
export type { CheckboxProps } from "./components/checkbox";

export { Switch, switchVariants } from "./components/switch";
export type { SwitchProps } from "./components/switch";

// ── Composites ──
export { Card } from "./components/card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardBodyProps,
  CardFooterProps,
} from "./components/card";

export { Modal, useModalContext } from "./components/modal";
export type {
  ModalProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps,
} from "./components/modal";

export { Tooltip } from "./components/tooltip";
export type { TooltipProps } from "./components/tooltip";

export { Dropdown } from "./components/dropdown";
export type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
} from "./components/dropdown";

export { Tabs } from "./components/tabs";
export type {
  TabsProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
} from "./components/tabs";

export { Drawer, useDrawerContext } from "./components/drawer";
export type {
  DrawerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerCloseProps,
} from "./components/drawer";
