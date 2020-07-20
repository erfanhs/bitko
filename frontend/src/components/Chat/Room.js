import React, { Component } from 'react';
import Chat from './Chat';
import { Modal, Input } from 'antd';
import * as Constants from '../../constants';
import axios from 'axios';


class Room extends Component {

    state = {
        isJoined: false,
        hasPassword: false,
        notFound: false,
        password: '',
        room: null
    }

    componentDidMount() {
        this.joinRoom();
    }

    onChange = e => {
        this.setState({
            password: e.target.value
        });
    }

    joinRoom = () => {
        let data = {
            room_id: this.props.match.params.roomID,
            password: this.state.password
        }
        axios.post(Constants.API_JOIN_ROOM, data)
        .then(response => {
            this.setState({
                isJoined: true,
                room: response.data
            })
        })
        .catch(error => {
            if (error.response.status === 404) {
                this.setState({
                    notFound: true
                })
            }
            else if (error.response.status === 403) {
                alert(error.response.data.error);
            }
            else if (error.response.status === 400) {
                this.setState({
                    hasPassword: true,
                })
            }
        });
    }

    render() {
        return (
            <div id='room'>
                {
                this.state.isJoined
                ?
                <Chat room={this.state.room}/>
                :
                this.state.hasPassword
                ?
                <Modal
                    centered
                    title="Ask Room Password"
                    okText="Join"
                    visible={true}
                    onOk={this.joinRoom}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <Input.Password placeholder="Room Password ?" onChange={this.onChange} value={this.state.password} />
                </Modal>
                :
                this.state.notFound
                ?
                <center><h1>404 Not Found</h1></center>
                :
                <center><h1>Joining Room ...</h1></center>
                }
            </div>
        );
    }
}

export default Room;