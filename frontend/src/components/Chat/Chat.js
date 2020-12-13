import React, { Component } from 'react';
import '../../assets/Chat.css';
import '../../assets/ScrollBar.css';
import Header from './Header';
import Footer from './Footer';
import Middle from './Middle';

import * as Constants from '../../constants';
import ReconnectingWebSocket from 'reconnecting-websocket';
import axios from 'axios';


class Chat extends Component {

    state = {
        isConnecting: true,
        webSocket: null,
        messages: null,
        users: [],
        members: null
    }

    componentDidMount() {
        let web_Sokcet = new ReconnectingWebSocket(Constants.CHAT_SOCKET + this.props.room.id + '/?token='+localStorage['simple_access_token']);
        web_Sokcet.addEventListener('open', this.onOpen);
        web_Sokcet.addEventListener('close', this.onClose);
        web_Sokcet.addEventListener('message', this.onMessage);
        this.setState({
            webSocket: web_Sokcet
        });
    }


    getMessages = () => {
        axios.get(Constants.API_MESSAGES + '?room_id=' + this.props.room.id)
        .then(response => {
            this.setState({
                messages: response.data
            })
        })
        .catch(error => {
            console.log(error.response.data)
        });
    }


    onOpen = () => {
        this.setState({
            isConnecting: false
        });
        this.getMessages();
    }


    onClose = () => {
        this.setState({
            isConnecting: true
        });
    }

    onMessage = message => {
        let data = JSON.parse(message.data);
        if (data.command === 'new_message') {
            const state = this.state;
            state.messages.push(data.message);
            this.setState(state);
        }
        else if (data.command === 'online_users') {
            this.setState({
                users: data.users,
                members: data.members
            });
        }
    }

    sendMessage = message => {
        let data = {
            command: 'new_message',
            message: message
        }
        this.state.webSocket.send(data=JSON.stringify(data));
    }

    render() {
        return (
            <div id="chat-body">
                <div id="chat" className="center-block">
                    <Header action={this.state.isConnecting ? 'Connecting...' : 'Connected'} roomName={this.props.room.room_name} users={this.state.users} members={this.state.members}/>
                    <Middle messages={this.state.messages}/>
                    <Footer sendMessage={this.sendMessage}/>
                </div>
            </div>
        );
    }
}

export default Chat;