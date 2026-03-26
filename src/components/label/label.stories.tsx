import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta = {
  title: "Forms/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Email address", htmlFor: "email" },
};

export const Required: Story = {
  args: { children: "Password", htmlFor: "password", required: true },
};

export const WithInput: Story = {
  render: () => (
    <div className="w-72 space-y-1.5">
      <Label htmlFor="demo" required>
        Full Name
      </Label>
      <input
        id="demo"
        type="text"
        placeholder="John Doe"
        className="w-full h-10 px-3 rounded-lg border border-[hsl(var(--ui-border))] bg-transparent text-[hsl(var(--ui-foreground))] text-sm"
      />
    </div>
  ),
};
