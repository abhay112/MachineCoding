import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';

import type { Question } from '../../features/machineCoding/types';
import { Button } from '../ui/Button';
import { useThemeContext } from '../../app/providers/ThemeProvider';

interface CodeEditorProps {
  question: Question;
  code: string;
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ question, code, onCodeChange }: CodeEditorProps) {
  const { theme } = useThemeContext();
  const [localCode, setLocalCode] = useState(code);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  /* ------------------------------------------------
   * MONACO CONFIG — BEFORE EDITOR LOADS
   * ------------------------------------------------ */
  const handleBeforeMount = (m: typeof monaco) => {
    /* ---------------- DARK THEME ---------------- */
    m.editor.defineTheme('colorful-dark', {
      base: 'vs-dark',
      inherit: true,

      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],

      semanticHighlighting: true,
      semanticTokenColors: {
        keyword: '#C586C0',
        variable: '#9CDCFE',
        function: '#DCDCAA',
        method: '#DCDCAA',
        type: '#4EC9B0',
        class: '#4EC9B0',
        interface: '#4EC9B0',
        parameter: '#9CDCFE',
        property: '#9CDCFE',
        enumMember: '#4EC9B0',

        // JSX
        jsxTagName: '#FFD700',
        jsxAttribute: '#9CDCFE',
      },

      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.lineHighlightBackground': '#2A2D2E',
      },
    });

    /* ---------------- LIGHT THEME ---------------- */
    m.editor.defineTheme('colorful-light', {
      base: 'vs',
      inherit: true,

      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
      ],

      semanticHighlighting: true,
      semanticTokenColors: {
        keyword: '#0000FF',
        variable: '#001080',
        function: '#795E26',
        method: '#795E26',
        type: '#267F99',
        class: '#267F99',
        interface: '#267F99',
        parameter: '#001080',
        property: '#001080',

        // JSX
        jsxTagName: '#800000',
        jsxAttribute: '#FF0000',
      },

      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editorLineNumber.foreground': '#237893',
        'editor.selectionBackground': '#ADD6FF',
        'editor.lineHighlightBackground': '#F5F5F5',
      },
    });

    /* -------- TypeScript / TSX compiler -------- */
    m.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: m.languages.typescript.ScriptTarget.ES2020,
      jsx: m.languages.typescript.JsxEmit.React,
      moduleResolution:
        m.languages.typescript.ModuleResolutionKind.NodeJs,
      allowNonTsExtensions: true,
      noEmit: true,
      lib: ['ES2020', 'DOM'],
    });
  };

  const handleMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleChange = (value?: string) => {
    const next = value ?? '';
    setLocalCode(next);
    onCodeChange(next);
  };

  const handleFormat = async () => {
    await editorRef.current
      ?.getAction('editor.action.formatDocument')
      ?.run();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localCode);
  };

  const editorTheme = theme === 'dark' ? 'colorful-dark' : 'colorful-light';

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
          <Button size="sm" variant="ghost" onClick={handleFormat}>
            Format
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language="typescriptreact"
          value={localCode}
          theme={editorTheme}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          onChange={handleChange}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: { enabled: true },
            semanticHighlighting: true,
          }}
        />
      </div>
    </div>
  );
}
