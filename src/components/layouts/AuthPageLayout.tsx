import type { ReactNode } from 'react';
import { AuthFooter } from '@/components/common/Auth/AuthFooter';
import { AuthHeader } from '@/components/common/Auth/AuthHeader';
import { LoadingOverlay } from '@/components/common/Loading';

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  footer?: {
    questionText: string;
    actionText: string;
    onActionClick: () => void;
    className?: string;
  };
}

export const AuthPageLayout = ({
  title,
  subtitle,
  isLoading,
  children,
  className = '',
  footer,
}: AuthPageLayoutProps) => (
  <div className={className}>
    <LoadingOverlay isVisible={isLoading} />
    <AuthHeader title={title} subtitle={subtitle} />
    {children}
    {footer && <AuthFooter {...footer} />}
  </div>
);
