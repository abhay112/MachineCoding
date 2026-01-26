// Map question IDs to their component file names
const componentNameMap: Record<string, string> = {
  counter: 'Counter',
  'todo-app': 'TodoApp',
  'debounced-search': 'DebouncedSearch',
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
 * Fetches the code from a component file dynamically
 */
export async function fetchComponentCode(questionId: string): Promise<string> {
  // Check cache first
  if (codeCache[questionId]) {
    return codeCache[questionId];
  }

  const componentName = componentNameMap[questionId];
  
  if (!componentName) {
    // Return empty string if component doesn't exist
    return '';
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
 * Gets question ID from file path
 */
function getQuestionIdFromPath(path: string): string | null {
  const fileName = path.split('/').pop()?.replace('.tsx', '') || '';
  
  const idMap: Record<string, string> = {
    Counter: 'counter',
    TodoApp: 'todo-app',
    DebouncedSearch: 'debounced-search',
    StaleClouserExample: 'stale-closure',
    Accordian: 'accordion',
  };
  
  return idMap[fileName] || null;
}
