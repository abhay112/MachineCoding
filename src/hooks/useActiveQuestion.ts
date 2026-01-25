import { useState, useEffect } from 'react';
import type { Question } from '../features/machineCoding/types';

export function useActiveQuestion(questions: Question[]) {
  const [activeQuestionId, setActiveQuestionId] = useState<string>(() => {
    const stored = localStorage.getItem('activeQuestionId');
    return stored || questions[0]?.id || '';
  });

  useEffect(() => {
    localStorage.setItem('activeQuestionId', activeQuestionId);
  }, [activeQuestionId]);

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  return { activeQuestion, activeQuestionId, setActiveQuestionId };
}
