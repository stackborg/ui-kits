import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "User avatar",
  },
};

export const WithInitials: Story = {
  args: { initials: "JD", alt: "John Doe" },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-url.test/avatar.png",
    initials: "FB",
    alt: "Fallback to initials",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
      <Avatar size="xl" initials="XL" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar
        size="md"
        src="https://i.pravatar.cc/150?img=1"
        className="ring-2 ring-[hsl(var(--ui-background))]"
      />
      <Avatar
        size="md"
        src="https://i.pravatar.cc/150?img=2"
        className="ring-2 ring-[hsl(var(--ui-background))]"
      />
      <Avatar
        size="md"
        src="https://i.pravatar.cc/150?img=3"
        className="ring-2 ring-[hsl(var(--ui-background))]"
      />
      <Avatar
        size="md"
        initials="+5"
        className="ring-2 ring-[hsl(var(--ui-background))]"
      />
    </div>
  ),
};
