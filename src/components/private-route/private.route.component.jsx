import './private-route.styles.scss';



import UserProfilePage from '../../pages/user-profile/user-profile.component';
import Homepage from '../../pages/dashboard/dashboard.component';
import { Route, Switch } from 'react-router-dom'
import MainSideNav from '../main-sidenav/main-sidenav.component';
import Exam from '../../pages/exam/exam.component';
import QuizOverview from '../quiz-overview/quiz-overview.component';
import QuizDemo from '../quiz-demo/quiz-demo.component';

const PrivateRoute = () => {

    //if (!isUserAuthenticated) {
    //    return (
    //        <Redirect to="/login" />
    //    )
    //}

    return (
        <div className="container-c">

            <MainSideNav />
            

            <main className="main-content">
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/userprofile' component={UserProfilePage} />
                    <Route exact path='/exam' component={Exam} />
                    <Route exact path='/exam/:id' component={QuizDemo} />
                </Switch>
            </main>


        </div>

    );
}

export default PrivateRoute;