import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import * as Utils from '../../utils';

class SignupForm extends Component {
    state = {
        username: '',
        password: ''
    };

    SignupUser = e => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            Utils.showAuthRes('please fill out the required fields !', false);
            return;
        }
        axios.post(Constants.API_SIGNUP, this.state)
        .then(response => {
            document.getElementById('login').click();
            Utils.showAuthRes('your account created successfully. sign in now : ', true);
        })
        .catch(error => {
            Utils.showAuthRes(error.response.data.error, false);
        });
        this.setState({username: '', password: ''});
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="signup-form" className="tab-pane fade">
                <div className="form_field">
                    <label htmlFor="signup_username"><i className="fa fa-user"></i></label>
                    <input type="username" placeholder="Username" name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form_field">
                    <label htmlFor="signup_password"><i className="fa fa-lock"></i></label>
                    <input type="password" placeholder="Password" name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </div>
                <button onClick={this.SignupUser}>SIGN UP</button>
            </div>
        );
    }
}

export default SignupForm;