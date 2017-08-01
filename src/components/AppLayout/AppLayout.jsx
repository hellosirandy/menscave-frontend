import React, { Component } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader/AppHeader';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import ArticlePage from './ArticlePage/ArticlePage';
import EditArticlePage from './EditArticlePage/EditArticlePage';
import LoginPage from './LoginPage/LoginPage';
import './AppLayout.css';

const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
      screenHeight: 0,
    }
  }
  componentDidMount() {
    this.setState({
      screenWidth: window.screen.width,
      screenHeight: window.screen.height
    });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header
          style={{ padding: 0 }}>
          <AppHeader/>
        </Header>
        <Content className="layout-content">
          <Switch>
            <Route exact path='/article/:article' component={ ArticlePage }/>
            <Route exact path='/admin/newarticle' component={ EditArticlePage }/>
            <Route exact path='/home' component={ Homepage }/>
            <Route exact path='/login' component={ LoginPage }/>
            <Redirect from='/' to='/home' />
            {/* <Redirect exact from='/#/article/:article' to='/article/article' /> */}
            {/* <Redirect exact from='/#/admin/newarticle' to='/admin/newarticle' /> */}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Men's Cave ©2017 Created by Alan Chien

        </Footer>
      </Layout>
    );
  }
}

export default AppLayout;
