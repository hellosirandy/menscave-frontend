import React, { Component } from 'react';
import Logo from './logo.png';
import { Route } from 'react-router-dom';

class AppHeader extends Component {
  render() {
    return(
      <div style={{ width: '70%', margin: 'auto', maxWidth: '1000px' }}>
        <div style={{ width: 40, height: 40, margin: '12px 24px 12px 0', float: 'left' }}>
          <Route
            render={({ history }) => (
              <img
                src={Logo} alt="Logo"
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {history.push('/home')}}/>
          )}/>
        </div>
      </div>

    )
  }
}

export default AppHeader;
