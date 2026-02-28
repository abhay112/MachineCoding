// Special cases that don't follow the kebab-case to PascalCase pattern
// Only add exceptions here for components with non-standard naming
const specialCases: Record<string, string> = {
  'stale-closure': 'StaleClouserExample',
  accordion: 'Accordian',
};

// Cache for fetched code
const codeCache: Record<string, string> = {};

// Lazy load all component files using Vite's import.meta.glob
const componentModules = import.meta.glob('/src/features/machineCoding/solutions/*.tsx', {
  as: 'raw',
  eager: false
});

/**
 * Converts kebab-case to PascalCase
 * Example: 'contact-form' -> 'ContactForm', 'todo-app' -> 'TodoApp'
 */
function kebabToPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Gets all available component file names from the glob
 */
function getAvailableComponentNames(): string[] {
  return Object.keys(componentModules).map(path => {
    const fileName = path.split('/').pop()?.replace('.tsx', '') || '';
    return fileName;
  });
}

/**
 * Finds the component file name for a given question ID
 * Tries automatic conversion first, then checks special cases, then searches available files
 */
function findComponentName(questionId: string): string | null {
  // Check special cases first
  if (specialCases[questionId]) {
    return specialCases[questionId];
  }

  // Try automatic conversion (kebab-case to PascalCase)
  const autoConverted = kebabToPascalCase(questionId);
  const autoPath = `/src/features/machineCoding/solutions/${autoConverted}.tsx`;
  if (componentModules[autoPath]) {
    return autoConverted;
  }

  // Fallback: search through all available files for a match
  // This handles cases where the file might have a slightly different name
  const availableNames = getAvailableComponentNames();
  const lowerQuestionId = questionId.toLowerCase();

  // Try to find a file that matches (case-insensitive, ignoring special chars)
  for (const name of availableNames) {
    const lowerName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const lowerId = lowerQuestionId.replace(/[^a-z0-9]/g, '');
    if (lowerName.includes(lowerId) || lowerId.includes(lowerName)) {
      return name;
    }
  }

  return null;
}

/**
 * Fetches the code from a component file dynamically
 */
export async function fetchComponentCode(questionId: string): Promise<string> {
  // Check cache first
  if (codeCache[questionId]) {
    return codeCache[questionId];
  }

  const componentName = findComponentName(questionId);

  if (!componentName) {
    // Return a starter template if component doesn't exist
    return `import React from 'react';

/**
 * Question: ${questionId}
 * Difficulty: ${questionId}
 * 
 * Implement your solution below!
 */
export default function Solution() {
  return (
    <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Ready to solve ${questionId.replace(/-/g, ' ')}?
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
        The solution file hasn't been created yet. You can start building it right here in the editor!
      </p>
      <div className="flex justify-center gap-4">
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
          React + Tailwind CSS Enabled
        </div>
      </div>
    </div>
  );
}`;
  }

  try {
    // Find the matching module path
    const modulePath = `/src/features/machineCoding/solutions/${componentName}.tsx`;
    const moduleLoader = componentModules[modulePath];

    if (!moduleLoader) {
      console.warn(`Component file not found: ${modulePath}`);
      return '';
    }

    const code = await moduleLoader();
    codeCache[questionId] = code as string;
    return code as string;
  } catch (error) {
    console.error(`Failed to fetch code for ${questionId}:`, error);
    return '';
  }
}

/**
 * Preloads all component codes
 */
export async function preloadComponentCodes(): Promise<void> {
  try {
    const loadPromises = Object.entries(componentModules).map(async ([path, moduleLoader]) => {
      const questionId = getQuestionIdFromPath(path);
      if (questionId && !codeCache[questionId]) {
        try {
          const code = await moduleLoader();
          codeCache[questionId] = code as string;
        } catch (error) {
          console.error(`Failed to preload ${path}:`, error);
        }
      }
    });

    await Promise.all(loadPromises);
  } catch (error) {
    console.error('Failed to preload component codes:', error);
  }
}

/**
 * Converts PascalCase to kebab-case
 * Example: 'ContactForm' -> 'contact-form', 'TodoApp' -> 'todo-app'
 */
function pascalToKebabCase(pascal: string): string {
  return pascal
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, ''); // Remove leading dash
}

/**
 * Gets question ID from file path (reverse lookup)
 * This is used for preloading - tries to match file names to question IDs
 */
function getQuestionIdFromPath(path: string): string | null {
  const fileName = path.split('/').pop()?.replace('.tsx', '') || '';

  // Check special cases (reverse lookup)
  const specialCaseEntries = Object.entries(specialCases);
  for (const [questionId, componentName] of specialCaseEntries) {
    if (componentName === fileName) {
      return questionId;
    }
  }

  // Try automatic conversion (PascalCase to kebab-case)
  const autoConverted = pascalToKebabCase(fileName);
  return autoConverted;
}
