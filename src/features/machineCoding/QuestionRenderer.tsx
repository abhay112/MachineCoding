import type { Question } from './types';

interface QuestionRendererProps {
  question: Question;
}

export function QuestionRenderer({ question }: QuestionRendererProps) {
  const Component = question.component;
  return <Component />;
}
