import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./tooltip";
import { Button } from "../button/button";

const meta = {
  title: "Composites/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  render: () => (
    <Tooltip content="Top tooltip" position="top">
      <Button variant="outline">Hover me (top)</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Bottom tooltip" position="bottom">
      <Button variant="outline">Hover me (bottom)</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip content="Left tooltip" position="left">
      <Button variant="outline">Hover me (left)</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip content="Right tooltip" position="right">
      <Button variant="outline">Hover me (right)</Button>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center gap-6 py-8">
      <Tooltip content="Top" position="top"><Button variant="ghost">Top</Button></Tooltip>
      <Tooltip content="Bottom" position="bottom"><Button variant="ghost">Bottom</Button></Tooltip>
      <Tooltip content="Left" position="left"><Button variant="ghost">Left</Button></Tooltip>
      <Tooltip content="Right" position="right"><Button variant="ghost">Right</Button></Tooltip>
    </div>
  ),
};
