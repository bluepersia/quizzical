import { useEffect, useState } from "react"
import Question from './question.jsx';

export default function Quiz()
{
    const [quiz, setQuiz] = useState ([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect (() => {
        newQuiz ();

    }, []);

    function playAgain ()
    {
        setIsChecked (false);
        newQuiz ();
    }
    function setAnswer (index, answer)
    {
        
        setQuiz (prev => prev.map ((q, i) => 
            i == index ? {...q, answer} : q));
    }

    function checkAnswers ()
    {
        setQuiz (prev => prev.map (q => ({...q, isCorrect: q.answer == q.correct_answer})));
        setIsChecked (true);
    }

    function countCorrectAnswers ()
    {
        return quiz.reduce ((prev, curr) => curr.isCorrect ? prev + 1 : prev, 0);
    }

    async function newQuiz ()
    {
        try {   
            const res = await fetch ("https://opentdb.com/api.php?amount=5");
            const data = await res.json ();

            for (const question of data.results)
                question.answers = question.incorrect_answers.concat (question.correct_answer).sort ((a,b) => 0.5 - Math.random ());
            
            setQuiz (data.results);

        }catch(err)
        {
            console.log (err);
        }
    }

    
    return <div className="quiz">
        {quiz.map ((q, i) => <Question key={i} {...q} isChecked={isChecked} setAnswer={(answer) => setAnswer(i, answer)}/>)}
        {isChecked ? (<div className="post-check"><p className="answers-scored">You scored {countCorrectAnswers ()}/5 correct answers</p>
        <button className="btn-1 play-again-btn" onClick={playAgain}>Play again</button></div>)
        : <button className="btn-1 check-btn" 
        onClick={checkAnswers}>Check answers</button>}
    </div>
}