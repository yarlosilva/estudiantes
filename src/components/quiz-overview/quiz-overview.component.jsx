import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Quiz from "../quiz/quiz.component";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { getQuestion } from '../../firebase/firebase.utilis';

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
    isPlaying: true,

    size: 120,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;


const QuizOverview = () => {
    const [questions, setQuestions] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
            const result = await getQuestion(id)
            console.log(result)
            setQuestions(result)
        }
        fetchQuestion()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        console.log('submitted')
    }


    const handleNumber = () => {
        return true === false ? 3 : 5
    }

    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 3600; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    return questions === null ? (<div> loading... </div>) : (
        <form onSubmit={handleSubmit}>
            <div className="row" style={{ textAlign: 'center' }}>

                {
                    questions.question.map(el => <Quiz value={handleNumber} {...el} />)
                }
                {/*
            
            
            <CountdownCircleTimer
                {...timerProps}
                colors={[["#EF798A"]]}
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > minuteSeconds
                ]}
            >
                {({ elapsedTime }) =>
                    renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                }
            </CountdownCircleTimer>
            
            */}


            </div>
            <button type="submit">Done</button>
        </form>
    );
}

export default QuizOverview;


