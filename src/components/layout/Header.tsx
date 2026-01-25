import { useThemeContext } from '../../app/providers/ThemeProvider';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

export function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Frontend Machine Coding
        </h1>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          Practice Platform
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle
          checked={theme === 'dark'}
          onCheckedChange={() => toggleTheme()}
          label={theme === 'dark' ? 'Dark' : 'Light'}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open('https://github.com', '_blank')}
          title="Keyboard shortcuts: Cmd/Ctrl + K"
        >
          ⌘K
        </Button>
      </div>
    </header>
  );
}
