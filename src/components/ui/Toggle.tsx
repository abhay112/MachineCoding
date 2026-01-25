import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ToggleProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onCheckedChange, label, className, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <div
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
