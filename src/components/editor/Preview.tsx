import { useState, useEffect } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { transform } from 'sucrase';
import * as React from 'react';
import type { Question } from '../../features/machineCoding/types';

interface PreviewProps {
  question: Question;
  code: string;
}

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="h-full flex items-center justify-center p-8 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md shadow-lg">
        <h3 className="text-red-800 dark:text-red-300 font-bold mb-3 flex items-center justify-center gap-2 text-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Runtime Error
        </h3>
        <pre className="text-red-600 dark:text-red-400 text-xs overflow-auto max-h-48 text-left p-3 bg-red-100/30 dark:bg-red-900/40 rounded border border-red-200/50 dark:border-red-800/50 whitespace-pre-wrap font-mono">
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </pre>
      </div>
    </div>
  );
}

export function Preview({ code }: PreviewProps) {
  const [LiveComponent, setLiveComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transpile code
      const transformed = transform(code, {
        transforms: ['typescript', 'jsx', 'imports'],
      }).code;

      // Create a function that executes the code and returns the default export
      // We mock a simple require system for React
      const runtimeRequire = (moduleName: string) => {
        if (moduleName === 'react') return React;
        throw new Error(`Module ${moduleName} not found in preview environment`);
      };

      const exports: { default?: any } = {};
      const module = { exports };

      // Simplified eval-like execution
      const executeCode = new Function('require', 'React', 'exports', 'module', transformed);
      executeCode(runtimeRequire, React, exports, module);

      const Component = exports.default || module.exports;

      if (typeof Component !== 'function') {
        throw new Error('No default export found. Please "export default function Component() { ... }"');
      }

      setLiveComponent(() => Component);
      setError(null);
    } catch (err: any) {
      console.error('Preview error:', err);
      setError(err.message);
      setLiveComponent(null);
    }
  }, [code]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center">
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 max-w-md shadow-lg">
          <h3 className="text-orange-800 dark:text-orange-300 font-bold mb-3 flex items-center justify-center gap-2 text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Compilation Error
          </h3>
          <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white dark:bg-gray-900 overflow-auto">
      <ErrorBoundary fallbackRender={ErrorFallback} resetKeys={[code]}>
        <div className="p-8 min-h-full">
          {LiveComponent ? (
            <div className="animate-in fade-in duration-500">
              <LiveComponent />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-sm font-medium">Updating preview...</p>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}
