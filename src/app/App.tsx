import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { SplitView } from '../components/layout/SplitView';
import { CodeEditor } from '../components/editor/CodeEditor';
import { Preview } from '../components/editor/Preview';
import { questions } from '../features/machineCoding/questions';
import { useActiveQuestion } from '../hooks/useActiveQuestion';
import type { Question } from '../features/machineCoding/types';
import { solutionCode } from '../features/machineCoding/solutionCode';

// Helper to get initial code for a question
function getInitialCode(question: Question): string {
  const stored = localStorage.getItem(`code_${question.id}`);
  if (stored) return stored;
  
  // Use reference solution if available
  if (solutionCode[question.id]) {
    return solutionCode[question.id];
  }
  
  // Default code template
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
}
`;
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { activeQuestion, activeQuestionId, setActiveQuestionId } = useActiveQuestion(questions);
  const [code, setCode] = useState(() => getInitialCode(activeQuestion));

  useEffect(() => {
    setCode(getInitialCode(activeQuestion));
  }, [activeQuestionId]);

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
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          questions={questions}
          activeQuestionId={activeQuestionId}
          onQuestionSelect={setActiveQuestionId}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <SplitView
          left={
            <CodeEditor
              question={activeQuestion}
              code={code}
              onCodeChange={handleCodeChange}
            />
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
