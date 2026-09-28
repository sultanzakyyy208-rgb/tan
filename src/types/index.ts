export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: number;
  makalahId: 1 | 2 | 3;
  makalahTitle: string;
  topic: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  lawReference?: string;
}

export interface MakalahSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    id: string;
    title: string;
    bullets?: string[];
    paragraphs?: string[];
  }[];
}

export interface Makalah {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  subject: string;
  authors: string[];
  advisor: string;
  school: string;
  year: string;
  summary: string;
  stats: {
    questionCount: number;
    subtopicsCount: number;
    keyPointsCount: number;
  };
  sections: MakalahSection[];
  keyLawTable?: {
    category: string;
    article: string;
    sanction: string;
    details: string;
  }[];
  comparativeTable?: {
    type: string;
    examples: string;
    pros: string;
    cons: string;
  }[];
}

export type UserAnswers = Record<number, 'A' | 'B' | 'C' | 'D' | 'E' | null>;
export type FlaggedQuestions = Record<number, boolean>;

export type ActiveTab = 'cbt' | 'materials' | 'bank' | 'review';

export type ExamMode = 'official' | 'practice';
