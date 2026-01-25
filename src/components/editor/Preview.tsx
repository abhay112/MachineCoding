import { ErrorBoundary } from 'react-error-boundary';
import type { Question } from '../../features/machineCoding/types';
import { cn } from '../../utils/cn';

interface PreviewProps {
  question: Question;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
        <h3 className="text-red-800 dark:text-red-300 font-semibold mb-2">Error in Component</h3>
        <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
      </div>
    </div>
  );
}

export function Preview({ question }: PreviewProps) {
  const Component = question.component;

  return (
    <div className="h-full bg-white dark:bg-gray-900 overflow-auto">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="p-8 min-h-full">
          <Component />
        </div>
      </ErrorBoundary>
    </div>
  );
}
