import he from "he";
import type { JSX } from "react/jsx-runtime";
import { determineAnswerClass } from "./QuizAnswer.utils";
import styles from "./QuizAnswer.module.css";
import clsx from "clsx";
import { memo } from "react";

type QuizAnswerProps = {
  isGameOver: boolean;
  chooseAnswer: (index: number, answer: string) => void;
  answer: string;
  isSelected: boolean;
  correct_answer: string;
  questionIndex: number;
};
function QuizAnswer({
  isGameOver,
  chooseAnswer,
  answer,
  isSelected,
  correct_answer,
  questionIndex,
}: QuizAnswerProps): JSX.Element {
  return (
    <button
      disabled={isGameOver}
      onClick={() => chooseAnswer(questionIndex, answer)}
      className={clsx(
        styles.answerBtn,
        styles[
          determineAnswerClass(
            isGameOver,
            isSelected,
            correct_answer === answer,
          )
        ],
      )}
    >
      {he.decode(answer)}
    </button>
  );
}

export default memo(QuizAnswer);
