import React, { Component } from 'react';
import '../../assets/Logged.css';
import Rooms from './Rooms';

import axios from 'axios';
import * as Constants from '../../constants';

import NewRoomModal from '../modals/NewRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import SettingsModal from '../modals/SettingsModal';

class Logged extends Component {

    state = {
        new_room: false,
        settings_button: false,
        join_room: false,
        joined_rooms: null,
        created_rooms: null
    };

    waitForRooms = () => {
        if (!this.state.isLoading) {
            if (this.state.error) {
                alert('an error in fetching rooms !');
            } else {
                return;
            }
        } else {
            setTimeout(this.waitForRooms, 200);
        }
    }

    getRooms = () => {
        axios.get(Constants.API_ROOMS)
        .then(response => {
            let rooms = response.data;
            let joined = [];
            let created = [];
            rooms.forEach(room => {
                if (room['creator'].toString() === localStorage['userid']) {
                    created.push(room);
                } else {
                    joined.push(room);
                }
            });
            this.setState({isLoading: false, joined_rooms: joined, created_rooms: created});
        })
        .catch(error => {
            this.setState({isLoading: false, error: true});
        });
        this.waitForRooms();
    }

    componentDidMount() {
        this.getRooms();
    }

    render() {
        return (
            <div id="logged-user">

                <h1>Wellcome, {localStorage.username}</h1><br />
                <button id="settings_button" onClick={e => {this.setState({settings_button: true})}}>Settings <i className="fas fa-cog"></i></button><br />
                <h2>you can create a new chat room and invite your friends, or join to another room.</h2><br />
                <button id="new_room" onClick={e => {this.setState({new_room: true})}}>Create <i className="fas fa-plus"></i></button>
                <button id="join_room" onClick={e => {this.setState({join_room: true})}}>Join <i className="fa fa-users" aria-hidden="true"></i></button>
                
                <h4>Your Created Rooms:</h4>
                <Rooms rooms={this.state.created_rooms}/>
                <h4>Your Joined Rooms:</h4>
                <Rooms rooms={this.state.joined_rooms}/>

                <NewRoomModal visible={this.state.new_room} onCancel={e => {this.setState({new_room: false})}}/>
                <JoinRoomModal visible={this.state.join_room} onCancel={e => {this.setState({join_room: false})}}/>
                <SettingsModal visible={this.state.settings_button} onCancel={e => {this.setState({settings_button: false})}}/>

            </div>
        );
    }
}

export default Logged;