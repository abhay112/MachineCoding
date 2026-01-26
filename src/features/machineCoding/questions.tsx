import type { Question } from './types';
import Counter from './solutions/Counter';
import TodoApp from './solutions/TodoApp';

import DebouncedSearch from './solutions/DebouncedSearch';
import Accordian from './solutions/Accordian';
import StaleClosureExample from './solutions/StaleClouserExample';
import ContactForm from './solutions/ContactForm';

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
    category: 'core',
    difficulty: 'easy',
    component: Counter,
  },
  {
    id: 'todo-app',
    title: 'Todo App (CRUD)',
    description: 'Create a todo application with create, read, update, and delete operations',
    category: 'core',
    difficulty: 'medium',
    component: TodoApp,
  },
  {
    id: 'debounced-search',
    title: 'Debounced search input',
    description: 'Implement a search input with debouncing to optimize API calls',
    category: 'core',
    difficulty: 'medium',
    component: DebouncedSearch,
  },
  {
    id: 'stale-closure',
    title: 'Stale Closure Example',
    description: 'Demonstrate the stale closure problem in React and how to fix it',
    category: 'core',
    difficulty: 'easy',
    component: StaleClosureExample,
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description: 'Create a contact form with name, email, and message fields',
    category: 'core',
    difficulty: 'medium',
    component: ContactForm,
  },
  {
    id: 'modal',
    title: 'Modal component',
    description: 'Build a reusable modal component with overlay and close functionality',
    category: 'core',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'tabs',
    title: 'Tabs component',
    description: 'Create a tabs component with keyboard navigation',
    category: 'core',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Build an accordion component with expand/collapse functionality',
    category: 'core',
    difficulty: 'easy',
    component: Accordian,
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: 'Implement pagination with page numbers and navigation',
    category: 'core',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite scroll',
    description: 'Create an infinite scroll list with loading states',
    category: 'core',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'dropdown-keyboard',
    title: 'Dropdown with keyboard navigation',
    description: 'Build a dropdown with arrow key navigation and selection',
    category: 'core',
    difficulty: 'hard',
    component: Placeholder,
  },

  // State & Hooks
  {
    id: 'use-debounce',
    title: 'useDebounce hook',
    description: 'Create a custom useDebounce hook',
    category: 'state',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'use-throttle',
    title: 'useThrottle hook',
    description: 'Create a custom useThrottle hook',
    category: 'state',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'use-previous',
    title: 'usePrevious hook',
    description: 'Create a custom usePrevious hook to track previous values',
    category: 'state',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'use-outside-click',
    title: 'useOutsideClick',
    description: 'Create a hook to detect clicks outside an element',
    category: 'state',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'custom-form-validation',
    title: 'Custom form validation hook',
    description: 'Build a reusable form validation hook',
    category: 'state',
    difficulty: 'hard',
    component: Placeholder,
  },

  // Performance
  {
    id: 'virtualized-list',
    title: 'Virtualized list',
    description: 'Implement a virtualized list for large datasets',
    category: 'performance',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'memoized-list',
    title: 'Memoized list rendering',
    description: 'Optimize list rendering with React.memo and useMemo',
    category: 'performance',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'optimized-search-filter',
    title: 'Optimized search filter',
    description: 'Create an optimized search filter with memoization',
    category: 'performance',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'image-lazy-loading',
    title: 'Image lazy loading',
    description: 'Implement lazy loading for images using Intersection Observer',
    category: 'performance',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'window-resize-optimization',
    title: 'Window resize listener optimization',
    description: 'Optimize window resize listeners with throttling',
    category: 'performance',
    difficulty: 'medium',
    component: Placeholder,
  },

  // UI / UX
  {
    id: 'toast-notifications',
    title: 'Toast notification system',
    description: 'Build a toast notification system with queue management',
    category: 'ui',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'theme-switcher',
    title: 'Theme switcher',
    description: 'Create a theme switcher with persistence',
    category: 'ui',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'skeleton-loader',
    title: 'Skeleton loader',
    description: 'Build skeleton loading components',
    category: 'ui',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'stepper',
    title: 'Stepper component',
    description: 'Create a multi-step stepper component',
    category: 'ui',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'carousel',
    title: 'Carousel / slider',
    description: 'Build a carousel component with autoplay and navigation',
    category: 'ui',
    difficulty: 'hard',
    component: Placeholder,
  },

  // Data Handling
  {
    id: 'table-sorting',
    title: 'Table with sorting',
    description: 'Create a table with sortable columns',
    category: 'data',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'table-filtering',
    title: 'Table with filtering',
    description: 'Build a table with column filtering',
    category: 'data',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'table-pagination',
    title: 'Table with pagination',
    description: 'Implement a table with pagination controls',
    category: 'data',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'searchable-dropdown',
    title: 'Searchable dropdown',
    description: 'Create a dropdown with search functionality',
    category: 'data',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'multi-select-dropdown',
    title: 'Multi-select dropdown',
    description: 'Build a multi-select dropdown component',
    category: 'data',
    difficulty: 'hard',
    component: Placeholder,
  },

  // Advanced
  {
    id: 'file-upload',
    title: 'File upload with preview',
    description: 'Create a file upload component with image preview',
    category: 'advanced',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'drag-drop-list',
    title: 'Drag and drop list',
    description: 'Implement a draggable and sortable list',
    category: 'advanced',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'kanban-board',
    title: 'Kanban board',
    description: 'Build a Kanban board with drag and drop',
    category: 'advanced',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'chat-ui',
    title: 'Chat UI',
    description: 'Create a chat interface with message bubbles',
    category: 'advanced',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'autocomplete',
    title: 'Autocomplete input',
    description: 'Build an autocomplete input with suggestions',
    category: 'advanced',
    difficulty: 'hard',
    component: Placeholder,
  },

  // Real-world
  {
    id: 'otp-input',
    title: 'OTP input',
    description: 'Create an OTP input component with auto-focus',
    category: 'real-world',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'countdown-timer',
    title: 'Countdown timer',
    description: 'Build a countdown timer component',
    category: 'real-world',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'rating',
    title: 'Rating component',
    description: 'Create a star rating component',
    category: 'real-world',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb navigation',
    description: 'Implement breadcrumb navigation',
    category: 'real-world',
    difficulty: 'easy',
    component: Placeholder,
  },
  {
    id: 'password-strength',
    title: 'Password strength checker',
    description: 'Build a password strength indicator',
    category: 'real-world',
    difficulty: 'medium',
    component: Placeholder,
  },

  // Architecture-level
  {
    id: 'feature-flags',
    title: 'Feature flag system',
    description: 'Create a feature flag system with context',
    category: 'architecture',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'role-based-ui',
    title: 'Role-based UI rendering',
    description: 'Implement role-based component rendering',
    category: 'architecture',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'error-boundary',
    title: 'Error boundary implementation',
    description: 'Create a reusable error boundary component',
    category: 'architecture',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'retry-api',
    title: 'Retry API mechanism (mock)',
    description: 'Build a retry mechanism for API calls',
    category: 'architecture',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'event-bus',
    title: 'Global event bus',
    description: 'Create a global event bus for component communication',
    category: 'architecture',
    difficulty: 'hard',
    component: Placeholder,
  },

  // Bonus (Standout)
  {
    id: 'form-builder',
    title: 'Form builder',
    description: 'Build a dynamic form builder',
    category: 'bonus',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'json-viewer',
    title: 'JSON viewer',
    description: 'Create a JSON viewer with expand/collapse',
    category: 'bonus',
    difficulty: 'medium',
    component: Placeholder,
  },
  {
    id: 'code-editor-wrapper',
    title: 'Code editor wrapper',
    description: 'Build a code editor wrapper with syntax highlighting',
    category: 'bonus',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'notification-center',
    title: 'Notification center',
    description: 'Create a notification center with real-time updates',
    category: 'bonus',
    difficulty: 'hard',
    component: Placeholder,
  },
  {
    id: 'dashboard-layout',
    title: 'Dashboard layout system',
    description: 'Build a responsive dashboard layout system',
    category: 'bonus',
    difficulty: 'hard',
    component: Placeholder,
  },
];
