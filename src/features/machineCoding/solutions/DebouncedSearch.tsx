import { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Mock search results
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [debouncedQuery, mockResults]);

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
}
