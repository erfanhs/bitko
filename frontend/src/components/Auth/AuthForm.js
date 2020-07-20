import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class AuthForm extends Component {
    render() {
        return (
            <div id="registration-tabs">
                <ul className="nav nav-tabs">
                    <li className="active tab-button"><a data-toggle="tab" id="login" href="#login-form">Login</a></li>
                    <li className="tab-button"><a data-toggle="tab" href="#signup-form">Signup</a></li>
                </ul>
                <div className="tab-content">
                    <LoginForm />
                    <SignupForm />
                </div>
            </div>
        );
    }
}


export default AuthForm;