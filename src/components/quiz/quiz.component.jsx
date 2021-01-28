import { useState, useEffect, useReducer } from 'react'
import './quiz.styles.scss';
import { connect } from 'react-redux';
import { increaseNumber } from '../../redux/result/result.action';


function reducer(state, action) {
    switch (action.type) {
        case "set":
            return action.payload;
        case "unMount":
            console.log(state); // This note has been closed: 201
            break;
        default:
            throw new Error();
    }
}

const Quiz = ({ question, questionOption, increase }) => {
    const [option, setOption] = useState(undefined)
    const [answer, setAnswer] = useState();
    const [questionOptionUn, setquestionOptionUn] = useState(questionOption);
    let problem = option;
    let answerArr = questionOptionUn;
    const [value, dispatch] = useReducer(reducer, 'nothing')
    useEffect(() => {
        dispatch({ type: "set", payload: option });
        return () => {

            const correctAnswer = answerArr.filter(el => !el.isCorrect === true)
            console.log(correctAnswer)
            //console.log(correctAnswer)
            //if (answer.isCorrect === )

            increase()

            dispatch({ type: "unMount" });
        }
    }, [option])
    return (
        <div className="col-12 col-md-7 m-auto" >
            <h3 className="quiz-question">{question}</h3>
            <span onClick={increase}>{value}</span>
            {
                questionOption.map(el => <div className={`quiz-option ${option === el.option ? 'active-option' : ''}`} onClick={() => {
                    setOption(el.option);
                    setAnswer(el)

                }} >{el.option}</div>)
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    increase: () => dispatch(increaseNumber())
})

export default connect(null, mapDispatchToProps)(Quiz);
