import type { JSX } from "react/jsx-runtime";
import "./App.css";
import { useState } from "react";
import Intro from "./pages/Intro/Intro";

function App(): JSX.Element {
  const [isGameActive, setIsGameActive] = useState(false);

  function startGame(): void {
    setIsGameActive(true);
  }
  return isGameActive ? <></> : <Intro startGame={startGame} />;
}

export default App;
