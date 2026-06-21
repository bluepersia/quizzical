import { arrayShuffle } from "array-shuffle";
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import type { QuizDataItem, QuizDataOriginal } from "./Quiz.types";
import styles from "./Quiz.module.css";
import Button from "../../components/Button/Button";
import QuizItem from "./QuizItem/QuizItem";
import clsx from "clsx";

export default function Quiz(): JSX.Element {
  const [quizData, setQuizData] = useState<QuizDataItem[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const correctAnswersRef = useRef<HTMLParagraphElement>(null);
  const quizRef = useRef<HTMLHeadingElement>(null);

  const correctAnswersCount = quizData.reduce((prev, curr) => {
    if (curr.chosen_answer === curr.correct_answer) return prev + 1;

    return prev;
  }, 0);

  function chooseAnswer(indexA: number, answer: string): void {
    setQuizData((prev) => {
      return prev.map((quizDataItem, indexB) =>
        indexA === indexB && quizDataItem.answers.includes(answer)
          ? {
              ...quizDataItem,
              chosen_answer: answer,
            }
          : quizDataItem,
      );
    });
  }

  useEffect(() => {
    if (isGameOver) {
      correctAnswersRef.current.focus();
      return;
    }

    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data: QuizDataOriginal) => {
        if (!data.results) return;

        const quizDataItems: QuizDataItem[] = data.results.map(
          (quizDataItemOriginal) => {
            return {
              ...quizDataItemOriginal,
              chosen_answer: "",
              answers: arrayShuffle([
                quizDataItemOriginal.correct_answer,
                ...quizDataItemOriginal.incorrect_answers,
              ]),
            };
          },
        );
        setQuizData(quizDataItems);
      });
  }, [isGameOver]);

  useEffect(() => {
    if (quizData) {
      quizRef.current.focus();
    }
  }, [quizData]);

  return (
    <div className={styles.quiz}>
      <section className={styles.questionnaire}>
        <h1 className="srOnly" tabIndex={-1} ref={quizRef}>
          Quiz
        </h1>
        <ul className={clsx(styles.questionsList, "resetList")}>
          {quizData.map((quizDataItem, index) => (
            <QuizItem
              key={quizDataItem.question}
              quizDataItem={quizDataItem}
              index={index}
              chooseAnswer={chooseAnswer}
              isGameOver={isGameOver}
            />
          ))}
        </ul>
      </section>
      <section className={styles.results}>
        <h2 className="srOnly">Quiz results</h2>
        {isGameOver ? (
          <div className={styles.resultsInner}>
            <p
              className={styles.correctAnswers}
              tabIndex={-1}
              ref={correctAnswersRef}
            >
              You scored {correctAnswersCount}/5 correct answers
            </p>
            <Button
              onClick={() => {
                setQuizData([]);
                setIsGameOver(false);
              }}
            >
              Play again
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setIsGameOver(true);
            }}
          >
            Check answers
          </Button>
        )}
      </section>
    </div>
  );
}
