import React, { Component } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader/AppHeader';
import AppContent from './AppContent/AppContent';

const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header
          style={{ padding: 0 }}>
          <AppHeader/>
        </Header>
        <Content>
          <AppContent/>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Men's Cave ©2017 Created by Alan Chien
        </Footer>
      </Layout>
    );
  }
}

export default AppLayout;
