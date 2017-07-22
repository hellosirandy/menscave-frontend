import React, { Component } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader/AppHeader';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import ArticlePage from './ArticlePage/ArticlePage';
import EditArticlePage from './EditArticlePage/EditArticlePage';

const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
  render() {
    return (
      <Layout>
        <Header
          style={{ padding: 0 }}>
          <AppHeader/>
        </Header>
        <Content
          style={{ width: '70%', margin: 'auto' }}>
          <Switch>
            <Route exact path='/home' component={ Homepage }/>
            <Route exact path='/article/:article' component={ ArticlePage }/>
            <Route exact path='/admin/newarticle' component={ EditArticlePage }/>
            <Redirect from='/' to='/home' />
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
