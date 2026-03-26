import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Label } from "../label/label";

const meta = {
  title: "Composites/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Modal.Content>
            <Modal.Close />
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
              <Modal.Description>
                This is a description of the modal content.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm">This is the modal body content. Press Escape or click the backdrop to close.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm">Confirm</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Create License</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Modal.Content size="lg">
            <Modal.Close />
            <Modal.Header>
              <Modal.Title>Create New License</Modal.Title>
              <Modal.Description>
                Fill in the details to generate a new license key.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" required>Client Name</Label>
                  <Input id="name" placeholder="Acme Corp" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" required>Email</Label>
                  <Input id="email" type="email" placeholder="admin@acme.com" />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm">Generate Key</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Modal.Content size="sm">
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
              <Modal.Description>
                This action cannot be undone. This will permanently delete the license key.
              </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={() => setOpen(false)}>Delete</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
