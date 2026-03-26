import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";
import { Badge } from "../badge/badge";

const meta = {
  title: "Composites/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-96">
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="general">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">General settings panel content.</p>
      </Tabs.Content>
      <Tabs.Content value="security">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">Security configuration and 2FA settings.</p>
      </Tabs.Content>
      <Tabs.Content value="billing">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">Billing history and payment methods.</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-96">
      <Tabs.List>
        <Tabs.Trigger value="active">
          <span className="flex items-center gap-1.5">Active <Badge variant="success" size="sm">12</Badge></span>
        </Tabs.Trigger>
        <Tabs.Trigger value="expired">
          <span className="flex items-center gap-1.5">Expired <Badge variant="destructive" size="sm">3</Badge></span>
        </Tabs.Trigger>
        <Tabs.Trigger value="draft">
          <span className="flex items-center gap-1.5">Draft <Badge variant="outline" size="sm">5</Badge></span>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="active">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">12 active licenses found.</p>
      </Tabs.Content>
      <Tabs.Content value="expired">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">3 licenses have expired.</p>
      </Tabs.Content>
      <Tabs.Content value="draft">
        <p className="text-sm text-[hsl(var(--ui-foreground))]">5 draft licenses pending activation.</p>
      </Tabs.Content>
    </Tabs>
  ),
};
