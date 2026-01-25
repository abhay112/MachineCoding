import type { ComponentType } from 'react';

export interface Question {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'state' | 'performance' | 'ui' | 'data' | 'advanced' | 'real-world' | 'architecture' | 'bonus';
  difficulty: 'easy' | 'medium' | 'hard';
  component: ComponentType;
}
