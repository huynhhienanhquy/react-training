import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastContainer} from './index';
import { toast, type ToastType } from '@/services/toast';

const ToastPreview = ({ type }: { type: ToastType }) => {
  useEffect(() => {
    toast[type](`This is a ${type} notification.`, { duration: 0 });
    return () => toast.dismiss();
  }, [type]);
  return <ToastContainer />;
};

const meta = {
  title: 'Components/Common/Toast',
  component: ToastPreview,
  tags: ['autodocs'],
  args: { type: 'success' },
  argTypes: { type: { control: 'select', options: ['success', 'error', 'info', 'warning'] } },
} satisfies Meta<typeof ToastPreview>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
