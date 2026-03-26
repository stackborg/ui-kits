import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";
import { Label } from "../label/label";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Write something..." },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-1.5">
      <Label htmlFor="msg">Message</Label>
      <Textarea id="msg" placeholder="Type your message here..." rows={4} />
    </div>
  ),
};

export const Error: Story = {
  args: { placeholder: "Description is required", error: true },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Disabled: Story = {
  args: { placeholder: "Cannot edit", disabled: true, value: "Read-only content" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
