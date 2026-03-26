import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import { Label } from "../label/label";

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    selectSize: { control: "select", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { options: sampleOptions, placeholder: "Select framework..." },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-1.5">
      <Label htmlFor="fw" required>Framework</Label>
      <Select id="fw" options={sampleOptions} placeholder="Choose one..." />
    </div>
  ),
};

export const Error: Story = {
  args: { options: sampleOptions, placeholder: "Required field", error: true },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Disabled: Story = {
  args: { options: sampleOptions, value: "react", disabled: true },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Select selectSize="sm" options={sampleOptions} placeholder="Small" />
      <Select selectSize="md" options={sampleOptions} placeholder="Medium" />
      <Select selectSize="lg" options={sampleOptions} placeholder="Large" />
    </div>
  ),
};
