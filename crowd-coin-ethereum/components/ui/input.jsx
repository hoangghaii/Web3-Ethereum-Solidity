import * as React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  (
    {
      className,
      inputClassName,
      type,
      icon,
      success,
      error,
      register,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <div className={cn('relative', className)}>
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              inputClassName,
            )}
            ref={ref}
            {...props}
            {...register}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
            {icon && !error && !success && icon}
            {success && <CheckCircle className="text-green-500" />}
            {error && <XCircle className="text-red-500" />}
          </div>
        </div>

        {error && (
          <span className="ml-1 text-sm text-red-500">{error.message}</span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
