type QuizDataItemBase = {
  question: string;
  correct_answer: string;
};

type QuizDataItemOriginal = QuizDataItemBase & {
  incorrect_answers: string[];
};

type QuizDataItem = QuizDataItemBase & {
  answers: string[];
  chosen_answer: string;
};

type QuizDataOriginal = {
  results: QuizDataItemOriginal[];
};

export type {
  QuizDataItemBase,
  QuizDataItemOriginal,
  QuizDataItem,
  QuizDataOriginal,
};
