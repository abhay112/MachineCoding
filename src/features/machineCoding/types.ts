import type { ComponentType } from 'react';

export interface Question {
  id: string;
  title: string;
  description: string;
  type: 'react' | 'javascript';
  category: 'core' | 'state' | 'performance' | 'ui' | 'data' | 'advanced' | 'real-world' | 'architecture' | 'bonus' | 'polyfill' | 'utility' | 'algorithm';
  difficulty: 'easy' | 'medium' | 'hard';
  component: ComponentType;
}
