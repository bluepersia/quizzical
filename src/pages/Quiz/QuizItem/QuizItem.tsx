import type { JSX } from "react/jsx-runtime";
import styles from "./QuizItem.module.css";
import he from "he";
import clsx from "clsx";
import type { QuizDataItem } from "../Quiz.types";

import { memo } from "react";
import QuizAnswer from "./QuizAnswer/QuizAnswer";

type QuizItemProps = {
  quizDataItem: QuizDataItem;
  index: number;
  chooseAnswer: (index: number, answer: string) => void;
  isGameOver: boolean;
};
function QuizItem({
  quizDataItem: { question, answers, chosen_answer, correct_answer },
  index,
  chooseAnswer,
  isGameOver,
}: QuizItemProps): JSX.Element {
  return (
    <li className={styles.quizItem}>
      <h2 className={styles.question}>{he.decode(question)}</h2>
      <ul className={clsx(styles.answers, "resetList")}>
        {answers.map((answer) => (
          <li key={answer} className={styles.answerItem}>
            <QuizAnswer
              answer={answer}
              isGameOver={isGameOver}
              chooseAnswer={chooseAnswer}
              isSelected={chosen_answer === answer}
              correct_answer={correct_answer}
              questionIndex={index}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}
export default memo(QuizItem);
