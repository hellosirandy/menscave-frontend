import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import ArticlePage from './ArticlePage/ArticlePage';
import EditArticlePage from './EditArticlePage/EditArticlePage';
import Responsive from 'react-responsive';

class AppContent extends Component {
  render() {
    const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
    const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={992} children={children} />;
    const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
    const route = (
      <Switch>
        <Route exact path='/article/:article' component={ ArticlePage }/>
        <Route exact path='/admin/newarticle' component={ EditArticlePage }/>
        <Route exact path='/home' component={ Homepage }/>
        <Redirect from='/' to='/home' />
      </Switch>
    )
    return (
      <div>
        <Desktop>
          <div style={{ width: '70%', margin: 'auto', maxWidth: '1000px'}}>
            {route}
          </div>
        </Desktop>
        <Tablet>
          <div style={{ width: '85%', margin: 'auto'}}>
            {route}
          </div>
        </Tablet>
        <Mobile>
          <div style={{ width: '100%'}}>
            {route}
          </div>
        </Mobile>
      </div>
    )
  }
}

export default AppContent;
