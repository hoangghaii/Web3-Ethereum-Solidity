'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button as RadixButton } from '@radix-ui/themes';
import { FC } from 'react';

type Props = {
  children: React.ReactNode | string;
  className?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  isLoading?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  type,
  className,
  children,
  isLoading,
  onClick,
}: Props) => {
  return (
    <RadixButton type={type} className={className} onClick={onClick}>
      {isLoading && (
        <ArrowPathIcon width="16" height="16" className="animate-spin" />
      )}

      {children}
    </RadixButton>
  );
};

export default Button;
