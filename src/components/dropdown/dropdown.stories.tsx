import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./dropdown";
import { Button } from "../button/button";

const meta = {
  title: "Composites/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">Options</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item destructive>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end w-80">
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="ghost" size="sm">⋯</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu align="end">
          <Dropdown.Item>View Details</Dropdown.Item>
          <Dropdown.Item>Download</Dropdown.Item>
          <Dropdown.Item>Share</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item destructive>Revoke</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

export const ActionMenu: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>
          Actions
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Generate Key</Dropdown.Item>
        <Dropdown.Item>Extend License</Dropdown.Item>
        <Dropdown.Item>Transfer Owner</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Suspend License</Dropdown.Item>
        <Dropdown.Item destructive>Delete License</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};
