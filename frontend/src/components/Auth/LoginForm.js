import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import * as Utils from '../../utils';

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    LoginUser = e => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            Utils.showAuthRes('please fill out the required fields !', false);
            return;
        }
        axios.post(Constants.API_LOGIN, this.state)
        .then(response => {
            localStorage['simple_access_token'] = response.data.access;
            localStorage['bearer_access_token'] = 'Bearer ' + response.data.access;
            localStorage['refresh_token'] = response.data.refresh;
            localStorage['username'] = response.data.username;
            localStorage['userid'] = response.data.id;
            window.location.reload();
        })
        .catch(error => {
            Utils.showAuthRes('The username or password is incorrect !', false);
        });
        this.setState({username: '', password: ''});
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="login-form" className="tab-pane fade in active">
                <div className="form_field">
                    <label htmlFor="login_username"><i className="fa fa-user"></i></label>
                    <input type="username" placeholder="Username" name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form_field">
                    <label htmlFor="login_password"><i className="fa fa-lock"></i></label>
                    <input type="password" placeholder="Password" name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </div>
                <button onClick={this.LoginUser}>SIGN IN</button>
            </div>
        );
    }
}

export default LoginForm;