import { useState } from 'react';

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
}
