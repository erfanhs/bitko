import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Modal, Input } from 'antd';
import * as Constants from '../../constants';
import axios from 'axios';


class JoinRoomModal extends Component {


    state = {
        room_name: '',
        room_password: '',
        redirect: ''
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    joinRoom = () => {
        let data = {
            room_name: this.state.room_name,
            password: this.state.room_password
        };
        axios.post(Constants.API_JOIN_ROOM, data)
        .then(response => {
            this.setState({ redirect: '/room/' + response.data.id })
        })
        .catch(error => {
            alert(error.response.data.error);
        });
        this.setState({room_name: '', room_password: ''});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Modal
                centered
                title="Join Room"
                okText="Join"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.joinRoom}
            >
                <Input placeholder="Room Name" name="room_name" onChange={this.onChange} value={this.state.room_name}/>
                <br />
                <br />
                <Input.Password placeholder="Room Password" name="room_password" onChange={this.onChange} value={this.state.room_password} />
            </Modal>
        );
    }
}

export default JoinRoomModal;
