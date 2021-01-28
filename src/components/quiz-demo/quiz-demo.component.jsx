import firebase from "firebase/app";
import "firebase/firestore";

import { useState, useEffect } from 'react';
import Quiz from 'react-quiz-component';
import { connect } from 'react-redux';

import { createResult, firestore, updateAverage, updateGroupResult } from '../../firebase/firebase.utilis';
import { totalAvarage } from './../../utilities'

import { selectCurrentUser } from '../../redux/user/user.selector';
import { useParams } from 'react-router-dom';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const checkUserExist = (id, userID) => {

    return id === userID

}

const QuizDemo = ({ user }) => {
    const [quiz, setQuiz] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const docRef = await firestore.doc(`questions/${id}`).get()
            const data = docRef.data()
            try {
                setQuiz(data);

            } catch (err) {
                console.log(err)

            }
        }
        getData()

    }, [id])

    const onCompleteAction = async (obj) => {

        if (obj.numberOfCorrectAnswers === 0 && obj.numberOfIncorrectAnswers === 0) {
            console.log('i am 0')

        } else {

            const total = totalAvarage(user.result, obj.correctPoints);
            const normalAvarage = total / user.result.length;
            const mainAvarage = (total + obj.correctPoints) / (user.result.length + 1)
            const oldObj = {
                firstName: user.firstName,
                id: user.id,
                average: normalAvarage
            }

            await createResult(user.id, obj, quiz.examName);
            await updateGroupResult(user.group, user.id, user.firstName, mainAvarage, oldObj);
            await updateAverage(user.id, mainAvarage);

            const userRef = firestore.doc(`questions/${id}`)
            await userRef.update({
                userEntry: firebase.firestore.FieldValue.arrayUnion({
                    id: user.id
                })


            }) 


        }


        // YOUR LOGIC GOES HERE
    }
    if (user && quiz) {


        let isExamHasGiven1 = quiz.userEntry.some(el => el.id === user.id)
        console.log(isExamHasGiven1)




        if (user.grade !== quiz.grade) {
            return (<div> You are not permitted to give exam in this grade </div>)
        }
        else if (quiz.isThereAnyExam === false) {
            return (<div>There Is no exam Today</div>)
        }
        else if (isExamHasGiven1 === false && quiz.isThereAnyExam === true) {
            return quiz ? (<Quiz quiz={quiz.question} onComplete={onCompleteAction} />) : (<div>Loading...</div>);
        } else if (isExamHasGiven1 === true) {
            return (<div>You have Already give your exam</div>)
        }
    } else {
        return (<div>Loading..</div>)
    }


}

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})

export default connect(mapStateToProps)(QuizDemo);