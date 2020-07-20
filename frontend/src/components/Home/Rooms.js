import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rooms extends Component {

    renderRooms = rooms => {
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
            <div id="rooms-container">
                { (this.props.rooms === null) ? (<h3>loading..</h3>) : ((this.props.rooms.length === 0) ? (<h3>there is no room !</h3>) : (<div id="rooms">{ this.renderRooms(this.props.rooms) }</div>))}
            </div>
        );
    }
}

export default Rooms;