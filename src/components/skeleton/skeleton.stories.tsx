import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["text", "circle", "rectangle"] },
    animate: { control: "select", options: ["pulse", "none"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text", width: 200 },
};

export const Circle: Story = {
  args: { variant: "circle", width: 48, height: 48 },
};

export const Rectangle: Story = {
  args: { variant: "rectangle", width: 300, height: 100 },
};

export const NoAnimation: Story = {
  args: { variant: "text", width: 200, animate: "none" },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 p-4 rounded-xl border border-[hsl(var(--ui-border))] space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangle" height={120} />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};
