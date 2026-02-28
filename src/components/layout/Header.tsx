import { useThemeContext } from '../../app/providers/ThemeProvider';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

import reactLogo from '../../assets/react.svg';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isEditorVisible: boolean;
  isPreviewVisible: boolean;
  onToggleEditor: () => void;
  onTogglePreview: () => void;
  mode: 'learning' | 'sandbox';
  onSetMode: (mode: 'learning' | 'sandbox') => void;
  onReset?: () => void;
  onCopy?: () => void;
}

export function Header({
  onToggleSidebar,
  isEditorVisible,
  isPreviewVisible,
  onToggleEditor,
  onTogglePreview,
  mode,
  onSetMode,
  onReset,
  onCopy
}: HeaderProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-between px-4 shadow-sm z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-1"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="flex items-center -space-x-1 mr-2">
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:rotate-[20deg] transition-transform">
              <img src={reactLogo} className="w-7 h-7" alt="React logo" />
            </a>
          </div>

          <h1 className="text-sm sm:text-lg lg:text-xl font-black bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent truncate hidden sm:block">
            Frontend Platform
          </h1>
        </div>
        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block mx-1"></div>

        <button
          onClick={() => onSetMode(mode === 'learning' ? 'sandbox' : 'learning')}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 border shadow-sm",
            mode === 'sandbox'
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="hidden sm:inline">{mode === 'sandbox' ? 'Exit Sandbox' : 'Interview Sandbox'}</span>
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 bg-gray-100/50 dark:bg-gray-700/50 p-1 rounded-lg border border-gray-200 dark:border-gray-700 ml-auto mr-4">
        <button
          onClick={onToggleEditor}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${isEditorVisible
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          title="Toggle Code Editor"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="hidden md:inline">Editor</span>
        </button>
        <button
          onClick={onTogglePreview}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${isPreviewVisible
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          title="Toggle Live Preview"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="hidden md:inline">Preview</span>
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 mr-4 ml-2">
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset} title="Reset to initial solution">
            Reset
          </Button>
        )}
        {onCopy && (
          <Button variant="ghost" size="sm" onClick={onCopy} title="Copy code">
            Copy
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block">
          <Toggle
            checked={theme === 'dark'}
            onCheckedChange={() => toggleTheme()}
            label={theme === 'dark' ? 'Dark' : 'Light'}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex"
          onClick={() => window.open('https://github.com', '_blank')}
          title="Keyboard shortcuts: Cmd/Ctrl + K"
        >
          ⌘K
        </Button>
      </div>
    </header>
  );
}
