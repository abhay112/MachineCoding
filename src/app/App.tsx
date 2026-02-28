import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { SplitView } from '../components/layout/SplitView';
import { CodeEditor } from '../components/editor/CodeEditor';
import { Preview } from '../components/editor/Preview';
import { questions } from '../features/machineCoding/questions';
import { useActiveQuestion } from '../hooks/useActiveQuestion';
import type { Question } from '../features/machineCoding/types';
import { fetchComponentCode } from '../utils/fetchComponentCode';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname === '/sandbox' ? 'sandbox' : 'learning';

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const { activeQuestion, activeQuestionId, setActiveQuestionId } = useActiveQuestion(questions);
  const [code, setCode] = useState<string>('');

  const [sandboxCode, setSandboxCode] = useState<string>(() => {
    return localStorage.getItem('sandbox_code') ||
      `import { useState } from 'react';

export default function InterviewSandbox() {
  const [message, setMessage] = useState('Hello Interviewer!');
  
  console.log("Sandbox initialized");

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {message}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This is your private sandbox for live interviews. Run any React code from scratch!
      </p>
      <button 
        onClick={() => {
          const next = "Let's Build Something Great!";
          setMessage(next);
          console.log("Message updated to:", next);
        }}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
      >
        Update Message
      </button>
    </div>
  );
}`;
  });

  const [isLoadingCode, setIsLoadingCode] = useState(true);

  // Collapse sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update URL search param for active question
  useEffect(() => {
    if (mode === 'learning') {
      const params = new URLSearchParams(window.location.search);
      if (activeQuestionId) {
        params.set('q', activeQuestionId);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      }
    }
  }, [activeQuestionId, mode]);

  useEffect(() => {
    const loadCode = async () => {
      setIsLoadingCode(true);
      const savedCode = localStorage.getItem(`code_${activeQuestionId}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        const initialCode = await fetchComponentCode(activeQuestionId || '');
        setCode(initialCode);
      }
      setIsLoadingCode(false);
    };

    if (mode === 'learning') {
      loadCode();
    }
  }, [activeQuestionId, activeQuestion, mode]);

  const handleCodeChange = (newCode: string) => {
    if (mode === 'learning') {
      setCode(newCode);
      localStorage.setItem(`code_${activeQuestionId}`, newCode);
    }
  };

  const handleSandboxCodeChange = (newCode: string) => {
    setSandboxCode(newCode);
    localStorage.setItem('sandbox_code', newCode);
  };

  const handleQuestionSelect = (id: string) => {
    setActiveQuestionId(id);
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset your code to the default solution? This cannot be undone.')) {
      if (mode === 'learning') {
        localStorage.removeItem(`code_${activeQuestionId}`);
        const initialCode = await fetchComponentCode(activeQuestionId || '');
        setCode(initialCode);
      } else {
        localStorage.removeItem('sandbox_code');
        setSandboxCode(`import { useState } from 'react';

export default function InterviewSandbox() {
  const [message, setMessage] = useState('Hello Interviewer!');
  
  console.log("Sandbox initialized");

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {message}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This is your private sandbox for live interviews. Run any React code from scratch!
      </p>
      <button 
        onClick={() => {
          const next = "Let's Build Something Great!";
          setMessage(next);
          console.log("Message updated to:", next);
        }}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
      >
        Update Message
      </button>
    </div>
  );
}`);
      }
    }
  };

  const handleCopy = () => {
    const codeToCopy = mode === 'learning' ? code : sandboxCode;
    navigator.clipboard.writeText(codeToCopy);
  };

  const handleSetMode = (newMode: 'learning' | 'sandbox') => {
    navigate(newMode === 'sandbox' ? '/sandbox' : '/');
  };

  const sandboxQuestion: Question = {
    id: 'sandbox',
    title: 'Interview Sandbox',
    description: 'A clean slate for your live technical interview.',
    type: 'react',
    category: 'core',
    difficulty: 'medium',
    component: () => null,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Option to add search palette here
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Header
        onToggleSidebar={mode === 'learning' ? () => setIsSidebarCollapsed((prev) => !prev) : undefined}
        isEditorVisible={isEditorVisible}
        isPreviewVisible={isPreviewVisible}
        onToggleEditor={() => {
          if (!isPreviewVisible && isEditorVisible) setIsPreviewVisible(true);
          setIsEditorVisible((prev) => !prev);
        }}
        onTogglePreview={() => {
          if (!isEditorVisible && isPreviewVisible) setIsEditorVisible(true);
          setIsPreviewVisible((prev) => !prev);
        }}
        mode={mode}
        onSetMode={handleSetMode}
        onReset={handleReset}
        onCopy={handleCopy}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <Routes>
          <Route path="/" element={
            <>
              <Sidebar
                questions={questions}
                activeQuestionId={activeQuestionId}
                onQuestionSelect={handleQuestionSelect}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
              />
              <SplitView
                isLeftVisible={isEditorVisible}
                isRightVisible={isPreviewVisible}
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
                      onReset={handleReset}
                    />
                  )
                }
                right={<Preview question={activeQuestion} code={code} />}
                leftTitle="Code Editor"
                rightTitle="Live Preview"
              />
            </>
          } />
          <Route path="/sandbox" element={
            <SplitView
              isLeftVisible={isEditorVisible}
              isRightVisible={isPreviewVisible}
              left={
                <CodeEditor
                  question={sandboxQuestion}
                  code={sandboxCode}
                  onCodeChange={handleSandboxCodeChange}
                  onReset={handleReset}
                />
              }
              right={<Preview question={sandboxQuestion} code={sandboxCode} showConsoleAlways={true} />}
              leftTitle="Interview Editor"
              rightTitle="Interview Output"
            />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
