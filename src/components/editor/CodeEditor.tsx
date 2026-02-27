import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  //testing

  // Calculate line numbers
  const lines = localCode.split('\n');
  const lineCount = lines.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setLocalCode(next);
    onCodeChange(next);
  };

  const handleFormat = () => {
    // Simple formatting - indent with 2 spaces
    const formatted = localCode
      .split('\n')
      .map((line) => {
        // Basic indentation preservation
        const trimmed = line.trim();
        if (!trimmed) return '';
        return line;
      })
      .join('\n');
    
    setLocalCode(formatted);
    onCodeChange(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localCode);
  };

  const highlighterStyle = theme === 'dark' ? vscDarkPlus : vs;
  const bgColor = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const textColor = theme === 'dark' ? '#D4D4D4' : '#000000';
  const lineNumberColor = theme === 'dark' ? '#858585' : '#237893';
  const lineNumberBg = theme === 'dark' ? '#252526' : '#F8F8F8';
  
  // Scrollbar colors based on theme
  const scrollbarTrackColor = theme === 'dark' ? '#1E1E1E' : '#F5F5F5';
  const scrollbarThumbColor = theme === 'dark' ? '#424242' : '#CCCCCC';
  const scrollbarThumbHoverColor = theme === 'dark' ? '#4E4E4E' : '#B3B3B3';

  // Generate unique ID for this editor instance to scope styles
  const editorId = `code-editor-${question.id}`;

  // Inject scrollbar styles into document head for better reliability
  useEffect(() => {
    const styleId = `editor-scrollbar-${editorId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar {
        width: 12px;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-track {
        background: ${scrollbarTrackColor} !important;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-thumb {
        background: ${scrollbarThumbColor} !important;
        border-radius: 6px;
        border: 2px solid ${scrollbarTrackColor} !important;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-thumb:hover {
        background: ${scrollbarThumbHoverColor} !important;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar:horizontal {
        height: 12px;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-track:horizontal {
        background: ${scrollbarTrackColor} !important;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-thumb:horizontal {
        background: ${scrollbarThumbColor} !important;
        border-radius: 6px;
        border: 2px solid ${scrollbarTrackColor} !important;
      }
      [data-editor-id="${editorId}"] textarea::-webkit-scrollbar-thumb:horizontal:hover {
        background: ${scrollbarThumbHoverColor} !important;
      }
      .highlight-overlay::-webkit-scrollbar {
        display: none !important;
      }
      .highlight-overlay {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      .line-numbers::-webkit-scrollbar {
        display: none !important;
      }
      .line-numbers {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      .highlight-overlay pre {
        white-space: pre !important;
        word-wrap: normal !important;
        overflow-wrap: normal !important;
        overflow: visible !important;
        margin: 0 !important;
      }
      .highlight-overlay code {
        white-space: pre !important;
        word-wrap: normal !important;
        overflow-wrap: normal !important;
      }
    `;
    
    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, [editorId, scrollbarTrackColor, scrollbarThumbColor, scrollbarThumbHoverColor]);

  // Sync scroll: only textarea scrolls, highlight and line numbers follow
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (textarea && highlight && lineNumbers) {
      const handleScroll = () => {
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
        lineNumbers.scrollTop = textarea.scrollTop;
      };
      
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
      <div className="flex-1 relative overflow-hidden" style={{ background: bgColor }}>

        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="absolute left-0 top-0 bottom-0 line-numbers pointer-events-none overflow-hidden"
          style={{
            width: '50px',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: lineNumberBg,
            borderRight: `1px solid ${theme === 'dark' ? '#3E3E42' : '#E8E8E8'}`,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            textAlign: 'right',
            paddingRight: '12px',
            paddingLeft: '8px',
            color: lineNumberColor,
            userSelect: 'none',
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i + 1}
              style={{
                minHeight: '21px', // 14px * 1.5 line-height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Syntax Highlighter Overlay - not scrollable, synced with textarea */}
        <div 
          className="absolute inset-0 pointer-events-none highlight-overlay" 
          ref={highlightRef}
          style={{ 
            overflow: 'hidden',
            left: '50px', // Account for line numbers
            right: 0,
          }}
        >
          <SyntaxHighlighter
            language="tsx"
            style={highlighterStyle}
            customStyle={{
              margin: 0,
              padding: '16px',
              paddingLeft: '16px',
              background: 'transparent',
              fontSize: '14px',
              lineHeight: '1.5',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              whiteSpace: 'pre',
            }}
            PreTag="pre"
            CodeTag="code"
          >
            {localCode}
          </SyntaxHighlighter>
        </div>

        {/* Editable Textarea - only scrollable element with styled scrollbar */}
        <div data-editor-id={editorId} className="absolute inset-0" style={{ left: '50px', right: 0 }}>
          <textarea
            ref={textareaRef}
            value={localCode}
            onChange={handleChange}
            className="w-full h-full resize-none font-mono text-sm leading-relaxed p-4 border-0 outline-none"
            style={{
              color: 'transparent',
              background: 'transparent',
              caretColor: textColor,
              tabSize: 2,
              MozTabSize: 2,
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              overflow: 'auto',
              overflowX: 'auto',
              overflowY: 'auto',
              whiteSpace: 'pre',
              scrollbarWidth: 'thin', // Firefox
              scrollbarColor: `${scrollbarThumbColor} ${scrollbarTrackColor}`, // Firefox
              paddingLeft: '16px',
            }}
            spellCheck={false}
            wrap="off"
          />
        </div>
      </div>
    </div>
  );
}
