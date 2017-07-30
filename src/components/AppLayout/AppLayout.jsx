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
          style={{ width: '70%', margin: 'auto', maxWidth: '1000px' }}>
          <Switch>
            <Route exact path='/article/:article' component={ ArticlePage }/>
            <Route exact path='/admin/newarticle' component={ EditArticlePage }/>
            <Route exact path='/home' component={ Homepage }/>
            <Redirect from='/' to='/home' />
            {/* <Redirect exact from='/#/article/:article' to='/article/article' /> */}
            {/* <Redirect exact from='/#/admin/newarticle' to='/admin/newarticle' /> */}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', maxWidth: '1000px' }}>
          Men's Cave ©2017 Created by Alan Chien

        </Footer>
      </Layout>
    );
  }
}

export default AppLayout;
