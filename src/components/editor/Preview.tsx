import { useState, useEffect } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { transform } from 'sucrase';
import * as React from 'react';
import type { Question } from '../../features/machineCoding/types';

interface PreviewProps {
  question: Question;
  code: string;
  showConsoleAlways?: boolean;
}

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="h-full flex items-center justify-center p-8 text-center border-t border-red-100 dark:border-red-900/30">
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

export function Preview({ code, showConsoleAlways = false }: PreviewProps) {
  const [LiveComponent, setLiveComponent] = useState<React.ComponentType | null>(null);
  const [ConsoleComponent, setConsoleComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // Transpile code
        const transformed = transform(code, {
          transforms: ['typescript', 'jsx', 'imports'],
        }).code;

        // Mock a simple require system for React and console for logging
        const runtimeRequire = (moduleName: string) => {
          if (moduleName === 'react') return React;
          throw new Error(`Module ${moduleName} not found in preview environment`);
        };

        const logs: any[] = [];
        const mockConsole = {
          log: (...args: any[]) => {
            console.log(...args); // Keep in dev tools
            logs.push(args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
          },
          error: (...args: any[]) => {
            console.error(...args);
            logs.push(`Error: ${args.join(' ')}`);
          },
          warn: (...args: any[]) => {
            console.warn(...args);
            logs.push(`Warning: ${args.join(' ')}`);
          }
        };

        const exports: { default?: any } = {};
        const module = { exports };

        // Simplified eval-like execution
        const executeCode = new Function('require', 'React', 'exports', 'module', 'console', transformed);
        executeCode(runtimeRequire, React, exports, module, mockConsole);

        const Component = exports.default || module.exports;

        const LogView = () => (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mt-4">Console Logs</h4>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 font-mono text-sm overflow-auto shadow-2xl max-h-[400px] scrollbar-thin">
              {logs.length === 0 ? (
                <div className="text-gray-600 italic">No console logs yet...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-green-400 mb-2 last:mb-0 border-b border-gray-800/50 pb-2 last:border-0">
                    <span className="text-gray-700 mr-3 text-[10px]">[{i + 1}]</span>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        );

        if (typeof Component === 'function') {
          setLiveComponent(() => Component);
          setConsoleComponent(() => LogView);
        } else if (logs.length > 0) {
          setLiveComponent(() => LogView);
          setConsoleComponent(null);
        } else {
          throw new Error('No default export found and no logs were produced.');
        }

        setError(null);
      } catch (err: any) {
        console.error('Preview error:', err);
        setError(err.message);
        setLiveComponent(null);
        setConsoleComponent(null);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
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
    <div className="h-full bg-white dark:bg-gray-900 overflow-auto scrollbar-thin">
      <ErrorBoundary fallbackRender={ErrorFallback} resetKeys={[code]}>
        <div className="p-8 min-h-full flex flex-col gap-10">
          <div className="flex-1 min-h-[200px]">
            {LiveComponent ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
                <LiveComponent />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Ready for interview...</p>
              </div>
            )}
          </div>

          {(showConsoleAlways && ConsoleComponent) && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ConsoleComponent />
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}
