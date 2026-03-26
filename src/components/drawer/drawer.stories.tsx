import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./drawer";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Label } from "../label/label";
import { Separator } from "../separator/separator";
import { Switch } from "../switch/switch";

const meta = {
  title: "Composites/Drawer",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const RightSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} side="right">
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Settings</Drawer.Title>
              <Drawer.Description>Manage your application settings.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm">Save Changes</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} side="left">
          <Drawer.Content width="20rem">
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Navigation</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="space-y-1">
                {["Dashboard", "Licenses", "Users", "Analytics", "Settings"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[hsl(var(--ui-accent))] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Drawer</Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)}>
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>License Details</Drawer.Title>
              <Drawer.Description>Full history and configuration.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <div className="space-y-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="p-3 rounded-lg border border-[hsl(var(--ui-border))]">
                    <p className="text-sm font-medium">Event #{i + 1}</p>
                    <p className="text-xs text-[hsl(var(--ui-muted-foreground))] mt-1">
                      License activated for client_{i + 1}@example.com on 2024-01-{String(i + 1).padStart(2, "0")}.
                    </p>
                  </div>
                ))}
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Close</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};
