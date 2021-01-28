import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DarkTable from "../../components/dark-table/dark-table.component";
import DashboardCardOverview from "../../components/dashboard-card-overview/dashboard-card-overview.component";

import { firestore, getResult } from '../../firebase/firebase.utilis'
import { selectCurrentUser } from '../../redux/user/user.selector';

const Homepage = ({ user }) => {
    const [lastResult, setLastResult] = useState();
    const [userData, setUserData] = useState()

    useEffect(() => {
        const getResult = async () => {
            const docRef = firestore.doc('result/0Lsbc5zdNsXsMJHSeP1u');
            const data = await docRef.get();
            console.log(data.data())

        }
        getResult()
    }, [])
    useEffect(() => {
        if (user) {
            const getData = async () => {
                if (user) {
                    const docRef = await getResult(user.id);
                    docRef.onSnapshot(el => {
                        setLastResult(el.data().result)
                    })

                }


            }
            getData();
            setUserData(user)
        } else {
            setUserData(null)
        }


    }, [userData])

    window.value = 12


   
    return (
        <>
            <DashboardCardOverview lastResult={lastResult} />
            <DarkTable lastResult={lastResult} />

        </>


    );
}
const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})
export default connect(mapStateToProps)(Homepage);