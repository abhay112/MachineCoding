import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

import type { Question } from '../../features/machineCoding/types';
import { Button } from '../ui/Button';
import { useThemeContext } from '../../app/providers/ThemeProvider';

interface CodeEditorProps {
  question: Question;
  code: string;
  onCodeChange: (code: string) => void;
  onReset: () => void;
}

export function CodeEditor({ question, code, onCodeChange, onReset }: CodeEditorProps) {
  const { theme } = useThemeContext();
  const [localCode, setLocalCode] = useState(code);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(localCode);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-800 bg-white dark:bg-gray-800">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {question.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {question.description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={onReset} title="Reset to initial code">
            Reset
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          path="index.tsx"
          defaultLanguage="typescript"
          beforeMount={(monaco) => {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              jsx: monaco.languages.typescript.JsxEmit.React,
              target: monaco.languages.typescript.ScriptTarget.ESNext,
              module: monaco.languages.typescript.ModuleKind.ESNext,
              allowNonTsExtensions: true,
              esModuleInterop: true,
              allowJs: true,
              lib: ['esnext', 'dom'],
            });

            // Add basic JSX types to suppress "Cannot find name 'div'" errors
            monaco.languages.typescript.typescriptDefaults.addExtraLib(`
              declare namespace JSX {
                interface IntrinsicElements {
                  [elemName: string]: any;
                }
              }
              declare module 'react' {
                export const useState: any;
                export const useEffect: any;
                export default React;
              }
            `, 'react-shim.d.ts');
          }}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={localCode}
          onChange={(value) => {
            const next = value || '';
            setLocalCode(next);
            onCodeChange(next);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
      </div>
    </div>
  );
}
