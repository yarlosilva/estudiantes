import { useState, useEffect } from 'react';
import './exam.styles.scss';
import { Link } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utilis';



const Exam = () => {
    const [gradeList, setGradeList] = useState(null)
    useEffect(() => {



        const getListOfClass = async () => {
            const snapshot = await firestore.collection('questions').orderBy('grade').get()
            setGradeList(snapshot.docs.map(doc => doc.data()));
        }
        getListOfClass()

        return () => {
        }

    }, [])
    console.log(gradeList)

    return gradeList ? (
        <div className="row">
            <div className="col-lg-6">
                <h1>Choose Your class</h1>

                {
                    gradeList.map(el => (<div className="student-class">
                        <Link to={`/exam/${el.id}`}>
                            {el.grade}
                    <span style={{ backgroundColor: '#e74c3c' }} className="student-class__outlined">&nbsp;</span>
                        </Link>

                    </div>))
                }
            </div>
        </div>
    ) : (<div>Loading...</div>);
}

export default Exam;