import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const GoogleSignUp = ({ user, setUser }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                };
                console.log(user);
                setUser(signedInUser);
                setLoggedInUser(signedInUser);

                history.replace(from);
                setUserToken();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    const buttonStyle = {
        marginTop: '40px',
        height: '70px',
        width: '170px',
    };
    return (
        <div>
            <center>
                <h2>Or</h2>
                <button
                    style={buttonStyle}
                    className="btn-primary"
                    onClick={handleGoogleSignIn}
                >
                    Sign In with Google
                </button>
            </center>
        </div>
    );
};

export default GoogleSignUp;
const setUserToken = () => {
    firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        })
        .catch(function (error) {
            // Handle error
        });
};
