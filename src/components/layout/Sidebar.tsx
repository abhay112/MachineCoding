import { useState } from 'react';
import type { Question } from '../../features/machineCoding/types';
import { cn } from '../../utils/cn';
import { Tooltip } from '../ui/Tooltip';

interface SidebarProps {
  questions: Question[];
  activeQuestionId: string;
  onQuestionSelect: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

type Category = Question['category'];
type Difficulty = Question['difficulty'];

export function Sidebar({
  questions,
  activeQuestionId,
  onQuestionSelect,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories: Category[] = ['core', 'state', 'performance', 'ui', 'data', 'advanced', 'real-world', 'architecture', 'bonus'];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 transition-all duration-300 lg:h-full',
        isCollapsed ? 'opacity-0 pointer-events-none lg:w-0' : 'opacity-100 lg:w-80'
      )}
    >
      {/* Backdrop for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      <aside
        className={cn(
          'absolute inset-y-0 left-0 lg:relative h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transition-all duration-300 flex flex-col z-50',
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden' : 'translate-x-0 w-[280px] sm:w-80'
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Questions ({filteredQuestions.length}/{questions.length})
            </h2>
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Difficulty
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className={cn(
                    'flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                    selectedDifficulty === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  All
                </button>
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={cn(
                      'flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                      selectedDifficulty === difficulty
                        ? difficulty === 'easy'
                          ? 'bg-green-500 text-white'
                          : difficulty === 'medium'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                        : difficulty === 'easy'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : difficulty === 'medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                    )}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <nav className="p-2">
            {filteredQuestions.map((question) => {
              const isActive = question.id === activeQuestionId;
              return (
                <Tooltip key={question.id} content={question.description}>
                  <button
                    onClick={() => onQuestionSelect(question.id)}
                    className={cn(
                      'w-full text-left px-3 py-2.5 mb-1 rounded-lg transition-all duration-200',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm line-clamp-2 flex-1">{question.title}</span>
                      <span
                        className={cn(
                          'text-xs px-1.5 py-0.5 rounded shrink-0',
                          question.difficulty === 'easy'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        )}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                  </button>
                </Tooltip>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
}
