import type { JSX } from "react/jsx-runtime";
import styles from "./Intro.module.css";
import Button from "../../components/Button/Button";

type IntroProps = {
  startGame: () => void;
};
export default function Intro({ startGame }: IntroProps): JSX.Element {
  return (
    <div className={styles.intro}>
      <h1 className={styles.title}>Quizzical</h1>
      <p className={styles.desc}>Test your knowledge with this fun quiz!</p>
      <Button onClick={startGame} style={{ width: "192px" }}>
        Start quiz
      </Button>
    </div>
  );
}
