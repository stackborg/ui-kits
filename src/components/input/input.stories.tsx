import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";
import { Label } from "../label/label";

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter your email..." },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-1.5">
      <Label htmlFor="email" required>Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-80 space-y-1.5">
      <Label htmlFor="pw">Password</Label>
      <Input id="pw" type="password" error placeholder="••••••••" />
      <p className="text-xs text-[hsl(var(--ui-destructive))]">
        Password must be at least 8 characters
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: "Cannot edit", disabled: true, value: "read-only value" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Input placeholder="Search..." leftIcon={<SearchIcon />} />
      <Input placeholder="name@example.com" leftIcon={<MailIcon />} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
};
