import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [(Story) => <div className="h-20 flex"><Story /></div>],
};

export const InContext: Story = {
  render: () => (
    <div className="w-80 space-y-3 text-[hsl(var(--ui-foreground))]">
      <div className="text-sm font-medium">Section One</div>
      <Separator />
      <div className="text-sm font-medium">Section Two</div>
      <Separator />
      <div className="text-sm font-medium">Section Three</div>
    </div>
  ),
};
