import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";
import { Button } from "../button/button";
import { Badge } from "../badge/badge";

const meta = {
  title: "Composites/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>A short description about this card.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm">This is the card body content.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outline">Cancel</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card className="w-80" hoverable>
      <Card.Header>
        <Card.Title>Hoverable Card</Card.Title>
        <Card.Description>Hover to see elevation effect.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm">This card lifts on hover.</p>
      </Card.Body>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card className="w-80" clickable onClick={() => alert("Clicked!")}>
      <Card.Body>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">License Key</p>
            <p className="text-xs text-[hsl(var(--ui-muted-foreground))]">LK-2024-ABCD-EFGH</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-48">
        <Card.Body>
          <p className="text-xs text-[hsl(var(--ui-muted-foreground))] uppercase tracking-wider">Total Users</p>
          <p className="text-3xl font-bold mt-1">2,847</p>
          <p className="text-xs text-[hsl(var(--ui-success))] mt-1">+12.5%</p>
        </Card.Body>
      </Card>
      <Card className="w-48">
        <Card.Body>
          <p className="text-xs text-[hsl(var(--ui-muted-foreground))] uppercase tracking-wider">Revenue</p>
          <p className="text-3xl font-bold mt-1">$48.2k</p>
          <p className="text-xs text-[hsl(var(--ui-destructive))] mt-1">-3.1%</p>
        </Card.Body>
      </Card>
    </div>
  ),
};
