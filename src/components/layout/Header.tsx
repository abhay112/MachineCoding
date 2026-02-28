import { useThemeContext } from '../../app/providers/ThemeProvider';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isEditorVisible: boolean;
  isPreviewVisible: boolean;
  onToggleEditor: () => void;
  onTogglePreview: () => void;
}

export function Header({
  onToggleSidebar,
  isEditorVisible,
  isPreviewVisible,
  onToggleEditor,
  onTogglePreview
}: HeaderProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-between px-4 shadow-sm z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
        <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 truncate max-w-[100px] sm:max-w-none">
          Frontend Machine Coding
        </h1>
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
