import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Enable notifications" },
};

export const Checked: Story = {
  args: { label: "Active", defaultChecked: true },
};

export const Small: Story = {
  args: { label: "Compact toggle", size: "sm" },
};

export const Disabled: Story = {
  args: { label: "Cannot toggle", disabled: true, defaultChecked: true },
};

export const SettingsForm: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--ui-foreground))]">Dark mode</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--ui-foreground))]">Email alerts</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--ui-foreground))]">Two-factor auth</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--ui-muted-foreground))]">Beta features</span>
        <Switch disabled />
      </div>
    </div>
  ),
};
