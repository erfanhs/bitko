import React, { Component } from 'react';

class Footer extends Component {

    state = {
        message: ''
    }

    onChange = e => {
        this.setState({
            message: e.target.value
        });
    }

    onKeyUp = e => {
        if (e.key === 'Enter') this.send();
    }

    send = e => {
        this.setState({
            message: ''
        });
        if (this.state.message) {
            this.props.sendMessage(this.state.message);
        }
    }
    

    render() {
        return (
            <footer>
                <input dir="auto" type="text" placeholder="Type Message .." onChange={this.onChange} value={this.state.message} onKeyUp={this.onKeyUp}/>
                <button onClick={this.send}>Send <i className="fas fa-paper-plane"></i></button>
            </footer>
        );
    }
}

export default Footer;