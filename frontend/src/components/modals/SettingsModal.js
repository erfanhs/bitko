import React, { Component } from 'react';
import { Modal, Input, Button } from 'antd';
import axios from 'axios';
import * as Constants from '../../constants';

class SettingsModal extends Component {

    state = {
        del_password: '',
        old_password: '',
        new_password: ''
    };

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    deleteAccount = () => {
        let data = {
            password: this.state.del_password
        };
        axios.post(Constants.API_DELETE_ACCOUNT, data)
        .then(response => {
            this.logout();
        })
        .catch(error => {
            alert(error.response.data.error);
        });
    }


    changePassword = () => {
        let data = {
            opassword: this.state.old_password,
            npassword: this.state.new_password
        };
        axios.post(Constants.API_CHANGE_PASSWORD, data)
        .then(response => {
            alert('your password changed successfully.');
        })
        .catch(error => {
            alert(error.response.data.error);
        });
        this.setState({old_password: '', new_password: ''});
    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Modal
                centered
                title="Account Settings"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                okButtonProps={{ style: {display: 'none'} }}
            >
                <h4>Password Change</h4>
                <br />
                <Input.Password placeholder="Old Password" name="old_password" onChange={this.onChange} value={this.state.old_password}/>
                <br />
                <br />
                <Input.Password placeholder="New Password" name="new_password" onChange={this.onChange} value={this.state.new_password}/>
                <br />
                <br />
                <Button type="primary" onClick={this.changePassword}><i className="fas fa-edit"></i> Change</Button>
                <br />
                <br />
                    <hr color="#e0e0e0"/>
                <br />
                <h4>Delete Account</h4>
                <br />
                <Input.Password placeholder="Your Password" name="del_password" onChange={this.onChange} value={this.state.del_password}/>
                <br />
                <br />
                <Button type="primary" onClick={this.deleteAccount} danger><i className="fa fa-trash" aria-hidden="true"></i> Delete</Button>
                <br />
                <br />
                <hr color="#e0e0e0"/>
                <Button type="primary" onClick={this.logout} danger><i className="fas fa-sign-out-alt"></i> Logout</Button>
            </Modal>
        );
    }
}

export default SettingsModal;