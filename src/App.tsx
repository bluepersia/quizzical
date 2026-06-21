import type { JSX } from "react/jsx-runtime";
import "./App.css";
import { useState } from "react";
import Intro from "./pages/Intro/Intro";
import Quiz from "./pages/Quiz/Quiz";

function App(): JSX.Element {
  const [isGameActive, setIsGameActive] = useState(false);

  function startGame(): void {
    setIsGameActive(true);
  }
  return isGameActive ? <Quiz /> : <Intro startGame={startGame} />;
}

export default App;
