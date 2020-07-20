import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { Link } from 'react-router-dom';

class JoinedRooms extends Component {

    state = {
        isLoading: true,
        rooms: [],
        error: null
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
            this.setState({isLoading: false, rooms: response.data});
        })
        .catch(error => {
            this.setState({isLoading: false, error: true});
        });
        this.waitForRooms();
    }

    componentDidMount() {
        this.getRooms();
    }

    renderRooms = rooms => {
        if (!rooms.length && !this.state.error) {
            return <h3>you have no room !</h3>
        }
        return rooms.map((room, i, arr) => (
            <Link to={'/room/' + room.id}>
                <div>
                    { room.room_name }
                </div>
            </Link>
        ));
    }

    render() {
        return (
            <div id="rooms">
                { this.renderRooms(this.state.rooms) }
            </div>
        );
    }
}

export default JoinedRooms;