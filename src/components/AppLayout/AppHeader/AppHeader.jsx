import React, { Component } from 'react';
import Logo from './logo.png';
import { Route } from 'react-router-dom';

class AppHeader extends Component {
  render() {
    return(
      <div style={{ width: '70%', margin: 'auto' }}>
        <div style={{width: 40, height: 40, marginTop: 11, cursor: 'pointer' }}>
          <Route
            render={({ history }) => (
              <img
                src={Logo} alt="Logo"
                style={{width: '100%', height: '100%'}}
                onClick={() => {history.push('/home')}}/>
          )}/>
        </div>


      </div>

    )
  }
}

export default AppHeader;
