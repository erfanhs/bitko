import React, { Component } from 'react';

import Guest from '../Home/Guest';
import Logged from '../Home/Logged';

import '../../assets/Home.css';
import '../../assets/ScrollBar.css';

class App extends Component {
    render() {
        return (
            <div id="home" className="center-block">
                { localStorage['simple_access_token'] ? <Logged /> : <Guest /> }
            </div>
        );
    }
}
  
export default App;