import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
}

export function SplitView({ left, right, leftTitle, rightTitle }: SplitViewProps) {
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById('split-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.max(20, Math.min(80, newRatio)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div id="split-container" className="flex-1 flex overflow-hidden relative">
      <div
        className="overflow-auto border-r border-gray-200 dark:border-gray-800"
        style={{ width: `${splitRatio}%` }}
      >
        {leftTitle && (
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{leftTitle}</h3>
          </div>
        )}
        <div className="h-full">{left}</div>
      </div>
      <div
        className={cn(
          'w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors',
          isDragging && 'bg-blue-500 dark:bg-blue-400'
        )}
        onMouseDown={handleMouseDown}
      />
      <div className="overflow-auto flex-1" style={{ width: `${100 - splitRatio}%` }}>
        {rightTitle && (
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rightTitle}</h3>
          </div>
        )}
        <div className="h-full">{right}</div>
      </div>
    </div>
  );
}
