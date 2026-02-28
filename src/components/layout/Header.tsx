import { useThemeContext } from '../../app/providers/ThemeProvider';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-between px-4 shadow-sm">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 truncate max-w-[150px] sm:max-w-none">
          Frontend Machine Coding
        </h1>
        <span className="hidden sm:inline-block text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
          Revision Platform
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="scale-75 sm:scale-100 origin-right">
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
