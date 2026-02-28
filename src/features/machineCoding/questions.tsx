import type { Question } from './types';
import Counter from './solutions/Counter';
import TodoApp from './solutions/TodoApp';
import DebouncedSearch from './solutions/DebouncedSearch';
import Accordian from './solutions/Accordian';
import StaleClosureExample from './solutions/StaleClouserExample';
import ContactForm from './solutions/ContactForm';
import InfiniteScroll from './solutions/InfiniteScroll';

// Placeholder component for questions not yet implemented
// eslint-disable-next-line react-refresh/only-export-components
const Placeholder = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <p className="text-gray-500 dark:text-gray-400 mb-2">Solution coming soon...</p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Implement this component in features/machineCoding/solutions/
      </p>
    </div>
  </div>
);

export const questions: Question[] = [
  // Core React (Most Asked)
  {
    id: 'counter',
    title: 'Counter with increment/decrement',
    description: 'Build a counter component with increment, decrement, and reset functionality',
    type: 'react',
    category: 'core',
    difficulty: 'easy',
    component: Counter,
  },
  {
    id: 'todo-app',
    title: 'Todo App (CRUD)',
    description: 'Create a todo application with create, read, update, and delete operations',
    type: 'react',
    category: 'core',
    difficulty: 'medium',
    component: TodoApp,
  },
  {
    id: 'debounced-search',
    title: 'Debounced search input',
    description: 'Implement a search input with debouncing to optimize API calls',
    type: 'react',
    category: 'core',
    difficulty: 'medium',
    component: DebouncedSearch,
  },
  {
    id: 'stale-closure',
    title: 'Stale Closure Example',
    description: 'Demonstrate the stale closure problem in React and how to fix it',
    type: 'react',
    category: 'core',
    difficulty: 'easy',
    component: StaleClosureExample,
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description: 'Create a contact form with name, email, and message fields',
    type: 'react',
    category: 'core',
    difficulty: 'medium',
    component: ContactForm,
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Build an accordion component with expand/collapse functionality',
    type: 'react',
    category: 'core',
    difficulty: 'easy',
    component: Accordian,
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite scroll',
    description: 'Create an infinite scroll list with loading states',
    type: 'react',
    category: 'core',
    difficulty: 'hard',
    component: InfiniteScroll,
  },

  // JavaScript Questions
  {
    id: 'debounce-js',
    title: 'Debounce Implementation',
    description: 'Implement a debounce function that delays invoking a function until after wait milli-seconds have elapsed since the last time the debounced function was invoked.',
    type: 'javascript',
    category: 'utility',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'throttle-js',
    title: 'Throttle Implementation',
    description: 'Implement a throttle function that only invokes the original function at most once per every wait milliseconds.',
    type: 'javascript',
    category: 'utility',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'array-map-polyfill',
    title: 'Array.prototype.map Polyfill',
    description: 'Implement your own version of Array.prototype.map.',
    type: 'javascript',
    category: 'polyfill',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'curry-implementation',
    title: 'Currying Implementation',
    description: 'Implement a function that takes a function and returns a curried version of that function.',
    type: 'javascript',
    category: 'utility',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'deep-clone',
    title: 'Deep Clone Utility',
    description: 'Implement a function that performs a deep clone of an object.',
    type: 'javascript',
    category: 'utility',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'promise-all-polyfill',
    title: 'Promise.all Polyfill',
    description: 'Implement a custom version of Promise.all that takes an array of promises and returns a single promise.',
    type: 'javascript',
    category: 'polyfill',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'flatten-array',
    title: 'Flatten Array',
    description: 'Implement a function to flatten a nested array to a single level.',
    type: 'javascript',
    category: 'algorithm',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'memoize-utility',
    title: 'Memoize Function',
    description: 'Create a memoization function that caches results of expensive function calls.',
    type: 'javascript',
    category: 'utility',
    difficulty: 'medium',
    component: Placeholder,
  }
];
