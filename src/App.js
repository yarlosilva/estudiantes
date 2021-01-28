import React, { useEffect, useState } from "react";
import "./App.scss";

import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { auth, currentUserProfile } from "./firebase/firebase.utilis";
import Spinner from "./components/spinner/spinner.component";
import PrivateRoute from "./components/private-route/private.route.component";
import { SetCurrentUser } from "./redux/user/user.action";

const App = ({ setUser }) => {
  const [userStatus, setUserStatus] = useState(undefined);
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const docRef = await currentUserProfile(userAuth);

        docRef.onSnapshot((snapshot) => {
          console.log(snapshot.data());
          setUserStatus(snapshot.data());

          setUser({ id: snapshot.id, ...snapshot.data() });
        });
      } else {
        setUserStatus(userAuth);

      }
    });
  }, []);

  if (userStatus === undefined) {
    return <Spinner />;
  } else if (userStatus === null) {
    return <Redirect to="/signin" />;
  } else if (userStatus) {
    console.log(userStatus)
    return (
      <div className="App">
        <Switch>
          <PrivateRoute />
        </Switch>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(SetCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
