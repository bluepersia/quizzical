export default function question ({answers, answer, setAnswer, question, correct_answer, isChecked})
{
    return (
        <div className="question">
            <h3 className="question_title">{question}</h3>
            <div className="answers">
                {answers.map ((a,i) => <button key={i} onClick={() => 
                    !isChecked && setAnswer(a)} 
                    className={`answer ${isChecked && a == correct_answer && answer != correct_answer && 'corrected'} ${answer == a && (isChecked ? "checked" : "selected")}`}>{a}</button>)}
            </div>
        </div>
    )
}