function determineAnswerClass(
  isGameOver: boolean,
  isSelected: boolean,
  isCorrect: boolean,
): string {
  if (isGameOver) {
    if (isCorrect) {
      return "answerBtnCorrect";
    }

    if (isSelected) {
      return "answerBtnIncorrect";
    }
  }
  return isSelected ? "answerBtnSelected" : "";
}

export { determineAnswerClass };
