import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { SplitView } from '../components/layout/SplitView';
import { CodeEditor } from '../components/editor/CodeEditor';
import { Preview } from '../components/editor/Preview';
import { questions } from '../features/machineCoding/questions';
import { useActiveQuestion } from '../hooks/useActiveQuestion';
import type { Question } from '../features/machineCoding/types';
import { fetchComponentCode, preloadComponentCodes } from '../utils/fetchComponentCode';

// Helper to get initial code for a question
async function getInitialCode(question: Question): Promise<string> {
  const stored = localStorage.getItem(`code_${question.id}`);
  if (stored) return stored;

  // Try to fetch from component file dynamically
  const componentCode = await fetchComponentCode(question.id);
  if (componentCode) {
    return componentCode;
  }

  // Default code template if component doesn't exist
  const componentName = question.id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `import { useState } from 'react';

export default function ${componentName}() {
  // Your solution here
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">${question.title}</h2>
      <p className="text-gray-600 dark:text-gray-400">${question.description}</p>
    </div>
  );
}`;
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { activeQuestion, activeQuestionId, setActiveQuestionId } = useActiveQuestion(questions);
  const [code, setCode] = useState<string>('');
  const [isLoadingCode, setIsLoadingCode] = useState(true);

  // Collapse sidebar on mobile by default
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarCollapsed(false);
    }
  }, []);

  // Preload all component codes on mount
  useEffect(() => {
    preloadComponentCodes();
  }, []);

  // Set active question and collapse sidebar on mobile when question selected
  const handleQuestionSelect = (id: string) => {
    setActiveQuestionId(id);
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  };

  // Load code when question changes
  useEffect(() => {
    setIsLoadingCode(true);
    getInitialCode(activeQuestion).then((initialCode) => {
      setCode(initialCode);
      setIsLoadingCode(false);
    });
  }, [activeQuestionId, activeQuestion]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`code_${activeQuestionId}`, newCode);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + B to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
      // Cmd/Ctrl + K for search (placeholder)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Could open a search modal here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar
          questions={questions}
          activeQuestionId={activeQuestionId}
          onQuestionSelect={handleQuestionSelect}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <SplitView
          left={
            isLoadingCode ? (
              <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">Loading code...</p>
              </div>
            ) : (
              <CodeEditor
                question={activeQuestion}
                code={code}
                onCodeChange={handleCodeChange}
              />
            )
          }
          right={<Preview question={activeQuestion} />}
          leftTitle="Code Editor"
          rightTitle="Live Preview"
        />
      </div>
    </div>
  );
}

export default App;
