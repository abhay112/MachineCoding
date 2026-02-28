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

  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

  return (
    <div id="split-container" className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <button
          onClick={() => setActiveTab('left')}
          className={cn(
            'flex-1 py-3 text-sm font-medium transition-colors border-b-2',
            activeTab === 'left'
              ? 'text-blue-600 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20'
              : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
          )}
        >
          {leftTitle || 'Editor'}
        </button>
        <button
          onClick={() => setActiveTab('right')}
          className={cn(
            'flex-1 py-3 text-sm font-medium transition-colors border-b-2',
            activeTab === 'right'
              ? 'text-blue-600 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20'
              : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
          )}
        >
          {rightTitle || 'Preview'}
        </button>
      </div>

      <div
        className={cn(
          'overflow-auto lg:border-r border-gray-200 dark:border-gray-800 flex-1 lg:flex-none',
          activeTab !== 'left' && 'hidden lg:block'
        )}
        style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${splitRatio}%` : 'auto' }}
      >
        {leftTitle && (
          <div className="hidden lg:block sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{leftTitle}</h3>
          </div>
        )}
        <div className="h-full">{left}</div>
      </div>

      <div
        className={cn(
          'hidden lg:block w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors',
          isDragging && 'bg-blue-500 dark:bg-blue-400'
        )}
        onMouseDown={handleMouseDown}
      />

      <div
        className={cn(
          'overflow-auto flex-1',
          activeTab !== 'right' && 'hidden lg:block'
        )}
        style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${100 - splitRatio}%` : 'auto' }}
      >
        {rightTitle && (
          <div className="hidden lg:block sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rightTitle}</h3>
          </div>
        )}
        <div className="h-full">{right}</div>
      </div>
    </div>
  );
}
