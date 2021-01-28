import './main-sidenav.styles.scss';
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utilis';

//fas fa-user fas fa-list-ul

const MainSideNav = () => {
    return (
        <>
            <nav class="sidenav">
                <div class="logo-box">Logo Here</div>
                <ul class="sidenav-items">
                    <li class="dashboard item">
                        <Link to='/' class="link link1 "
                        ><i className='fas r fa-tv'></i><span className="f-fam" >DashBoard</span></Link>
                    </li>

                    <li class="dashboard item">
                        <Link to='/userprofile' class="link link1 "
                        ><i className='fas r fa-user'></i><span className="f-fam" >User</span></Link>
                    </li>
                    <li class="dashboard item">
                        <Link to='/exam' class="link link1 "
                        ><i class="far r fa-copy "></i><span className="f-fam rr" >Take Exam</span></Link>
                    </li>
                    <li class="dashboard item">
                        <span class="link link1" onClick={() => auth.signOut()}
                        ><i class="fas r fa-sign-out-alt"></i><span className="f-fam " >Sign Out</span></span>
                    </li>


                </ul>
            </nav>
        </>
    );
}



export default MainSideNav;