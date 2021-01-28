import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utilis';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { totalAvarage } from '../../utilities';
import DashBoardCard from "../dashboard-card/dashboard-card.component";

const card = [1, 2, 3]

const DashboardCardOverview = ({ lastResult, user }) => {
    const [average, setAverage] = useState();
    console.log(lastResult)


    useEffect(() => {

        if (user) {
            const getData = async () => {
                const docRef = await firestore.doc(`users/${user.id}`).get();
                const data = docRef.data();
                setAverage(data.average)
                console.log(data.average)

            }

            getData()
        }


    }, [user])





    return lastResult ? (
        <div className="row">
            <DashBoardCard average={average} />
        </div>
    ) : (<div>Loading...</div>);
}
const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})
export default connect(mapStateToProps)(DashboardCardOverview);