import React, { Component } from 'react';
import Logo from './logo.png';
import { Route } from 'react-router-dom';
import { Button, message } from 'antd';
import Responsive from 'react-responsive';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { LoginModal } from './LoginModal/LoginModal';
import { auth } from '../../../tools/firebase';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
    });
  }

  onLogin = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (!err) {
        auth.signInWithEmailAndPassword(values.username, values.password).then(user => {
          this.setState({ modalOpen: false });
          message.success('You are now logged in', 3);
        }).catch(err => {
          if (err.code === 'auth/wrong-password') {
            form.setFields({
              password: {
                errors: [new Error(err.message)],
              },
            });
          } else if (err.code === 'auth/user-not-found') {
            form.setFields({
              username: {
                errors: [new Error(err.message)],
              },
            });
          }
        });
      }
    });
  }

  handleLoginLogoutClick = () => {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      this.setState({ modalOpen: true });
    } else {
      auth.signOut().then(() => {
        message.success('You are now logged out', 3);
      });
    }
  }

  render() {
    const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
    const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={991} children={children} />;
    const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;
    const { loggedIn } = this.state;
    const content = (
      <div>
        <div style={{ width: 40, height: 40, margin: '12px 24px 12px 0', float: 'left' }}>
          <Route
            render={({ history }) => (
              <img
                src={Logo} alt="Logo"
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {history.push('/home')}}/>
          )}/>
        </div>
        <div style={{ float: 'right' }}>
          {loggedIn &&
            <Route
              render={({ history }) => (
                <Button type="dashed" shape="circle" icon="plus"
                  style={{ backgroundColor: 'transparent', marginRight: 12 }}
                  ghost
                  onClick={() => {history.push('/admin/newarticle')}}/>
              )}/>
          }

          <DropdownMenu handleLoginLogoutClick={ this.handleLoginLogoutClick } loggedIn={ loggedIn }/>
          <LoginModal
            ref={(form) => { this.form = form }}
            visible={ this.state.modalOpen }
            onCancel={() => { this.setState({ modalOpen: false }) }}
            onLogin={this.onLogin}
          />
        </div>

      </div>
    )
    return(
      <div>
        <Desktop>
          <div style={{ width: '70%', margin: 'auto', maxWidth: '1000px'}}>
            {content}
          </div>
        </Desktop>
        <Tablet>
          <div style={{ width: '85%', margin: 'auto' }}>
            {content}
          </div>
        </Tablet>
        <Mobile>
          <div style={{ width: '100%', padding: '0 12px'}}>
            {content}
          </div>
        </Mobile>
      </div>

    )
  }
}

export default AppHeader;
