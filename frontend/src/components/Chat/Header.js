import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <header>
                <div className='online-users'>
                    <span>{this.props.users.length} <span style={{color: 'lightgreen'}}>online</span> from {this.props.members}</span>
                </div>

                <div className='room-name'>
                    <span>{this.props.roomName}</span>
                </div>

                <div className='chat-action'>
                    <span>{this.props.action}</span>
                </div>
            </header>
        );
    }
}

export default Header;