import { useState } from 'react'

import './App.css'
import Quiz from './quiz.jsx';

function App() {
  
  const [isPlaying, setIsPlaying] = useState (false);

  function play ()
  {
    setIsPlaying (true);
  }

  return (
    !isPlaying ?
    <div className='intro'>
      <h1 className='title'>Quizzical</h1>
      <button onClick={play} className='btn-1 start-btn'>Start quiz</button>
    </div>
    :
    <Quiz />
  )
}

export default App
