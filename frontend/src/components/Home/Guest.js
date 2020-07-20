import React, { Component } from 'react';
import AuthForm from '../Auth/AuthForm';
import '../../assets/Guest.css';

class Guest extends Component {
    render() {
        return (
            <div id="Guest-user">
                <h1>Bitko</h1><br />
                <h2>Bitko, where people talk online with each other on various topics.</h2><br />
                <div id="auth-user" className="center-block">
                    <div id="auth-result"></div>
                    <AuthForm />
                </div>
            </div>
        );
    }
}


export default Guest;