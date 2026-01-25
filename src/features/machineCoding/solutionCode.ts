// Reference code for implemented solutions
export const solutionCode: Record<string, string> = {
  counter: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-8 p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30 rounded-2xl">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
        Counter
      </h2>
      <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
        {count}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          Reset
        </button>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          Increment
        </button>
      </div>
    </div>
  );
}`,

  'todo-app': `import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Todo App</h2>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span
                className={\`flex-1 \${
                  todo.completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-gray-100'
                }\`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Total: {todos.length} | Completed: {todos.filter((t) => t.completed).length} | Pending:{' '}
          {todos.filter((t) => !t.completed).length}
        </div>
      )}
    </div>
  );
}`,

  'debounced-search': `import { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Mock search results
  const mockResults = [
    'React Hooks',
    'TypeScript Tutorial',
    'JavaScript ES6',
    'CSS Grid Layout',
    'Node.js Basics',
    'Vue.js Guide',
    'Angular Framework',
    'Tailwind CSS',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const filtered = mockResults.filter((item) =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Debounced Search
      </h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (500ms debounce)..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Query: <span className="font-mono">{query || '(empty)'}</span>
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Debounced: <span className="font-mono">{debouncedQuery || '(empty)'}</span>
        </p>
      </div>

      <div className="space-y-2">
        {results.length === 0 && debouncedQuery ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No results found
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Start typing to search...
          </p>
        ) : (
          results.map((result, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-gray-900 dark:text-gray-100"
            >
              {result}
            </div>
          ))
        )}
      </div>
    </div>
  );
}`,
};
