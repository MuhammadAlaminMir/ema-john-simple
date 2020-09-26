import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const LogInField = ({ user, setUser }) => {
    const handleBlur = (e) => {
        // console.log(e.target.name, ':', e.target.value);
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const reg = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordValid && reg;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            // console.log(newUserInfo);
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = (e) => {
        if (user.newUser) {
            if (user.email && user.password) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then((res) => {
                        const user = res.user;
                        const signedInUser = {
                            isSignedIn: true,
                            name:
                                user.displayName != null
                                    ? user.displayName
                                    : user.email,
                            email: user.email,
                            photoURL: user.photoURL,
                        };
                        setUser(signedInUser);
                        setLoggedInUser(signedInUser);
                        history.replace(from);
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const newUserInfo = { ...user };
                        newUserInfo.error = error.message;
                        setUser(newUserInfo);
                        console.log(error.message);
                    });
            }
        }
        if (user.newUser === false) {
            if (user.email && user.password) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then((res) => {
                        const user = res.user;
                        const signedInUser = {
                            isSignedIn: true,
                            name:
                                user.displayName != null
                                    ? user.displayName
                                    : user.email,
                            email: user.email,
                            photoURL: user.photoURL,
                        };

                        setUser(signedInUser);
                        setLoggedInUser(signedInUser);
                        history.replace(from);
                    })
                    .catch((error) => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = error.message;
                        setUser(newUserInfo);
                        console.log(error.message);
                    });
            }
        }

        e.preventDefault();
    };
    return (
        <div className="container">
            <h3>Sign In with Email & Password</h3>
            <Form
                onSubmit={handleSubmit}
                title="You have to give valid email & password "
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        onBlur={handleBlur}
                        required
                        name="email"
                        placeholder="your email"
                        autoComplete="on"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onBlur={handleBlur}
                        type="password"
                        required
                        name="password"
                        id=""
                        placeholder="your password"
                        autoComplete="on"
                        title="you have to give at list 1 number character"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="New User"
                        title="if you are new to hare please check that box"
                        onClick={() => {
                            user.newUser = true;
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {user.isSignedIn ? (
                <p style={{ color: 'green' }}>Sign IN Successfully</p>
            ) : (
                <p style={{ color: 'red' }}>{user.error}</p>
            )}
        </div>
    );
};

export default LogInField;
