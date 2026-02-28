import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  isLeftVisible?: boolean;
  isRightVisible?: boolean;
}

export function SplitView({
  left,
  right,
  leftTitle,
  rightTitle,
  isLeftVisible = true,
  isRightVisible = true
}: SplitViewProps) {
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById('split-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.max(10, Math.min(90, newRatio)));
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

  // Calculate widths based on visibility
  const getLeftWidth = () => {
    if (!isLeftVisible) return '0%';
    if (!isRightVisible) return '100%';
    return `${splitRatio}%`;
  };

  const getRightWidth = () => {
    if (!isRightVisible) return '0%';
    if (!isLeftVisible) return '100%';
    return `${100 - splitRatio}%`;
  };

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

      {/* Editor Panel */}
      <div
        className={cn(
          'overflow-hidden lg:border-r border-gray-200 dark:border-gray-800 transition-all duration-500 ease-in-out flex flex-col',
          activeTab !== 'left' && 'hidden lg:flex',
          !isLeftVisible && 'lg:!w-0 lg:border-none'
        )}
        style={{
          width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? getLeftWidth() : 'auto',
          opacity: isLeftVisible ? 1 : 0,
          visibility: isLeftVisible ? 'visible' : 'hidden',
        }}
      >
        {leftTitle && isLeftVisible && (
          <div className="hidden lg:block sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{leftTitle}</h3>
          </div>
        )}
        <div className="flex-1 min-h-0">{left}</div>
      </div>

      {/* Resize Handle */}
      {isLeftVisible && isRightVisible && (
        <div
          className={cn(
            'hidden lg:block w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors z-20',
            isDragging && 'bg-blue-500 dark:bg-blue-400'
          )}
          onMouseDown={handleMouseDown}
        />
      )}

      {/* Preview Panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-in-out flex flex-col flex-1',
          activeTab !== 'right' && 'hidden lg:flex',
          !isRightVisible && 'lg:!w-0 lg:flex-none'
        )}
        style={{
          width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? getRightWidth() : 'auto',
          opacity: isRightVisible ? 1 : 0,
          visibility: isRightVisible ? 'visible' : 'hidden',
        }}
      >
        {rightTitle && isRightVisible && (
          <div className="hidden lg:block sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 py-2 z-10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rightTitle}</h3>
          </div>
        )}
        <div className="flex-1 min-h-0">{right}</div>
      </div>
    </div>
  );
}

