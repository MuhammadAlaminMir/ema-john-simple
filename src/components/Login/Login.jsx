import React, { useState } from 'react';
import GoogleSignUp from './GoogleSignUp';

import LoginForm from './LoginForm';

const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        photoURL: '',
    });

    return (
        <div className="login-page">
            <LoginForm user={user} setUser={setUser} />
            <GoogleSignUp user={user} setUser={setUser} />
        </div>
    );
};

export default Login;
