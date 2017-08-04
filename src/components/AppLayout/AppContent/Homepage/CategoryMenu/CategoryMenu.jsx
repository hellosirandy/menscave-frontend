import React, { Component } from 'react';
import { Menu } from 'antd';

class CategoryMenu extends Component {
  handleClick = (e) => {
    this.props.updateCategory(e.key);
  }

  render() {
    return(
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.props.category]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="all" style={{ width: '25%', textAlign: 'center' }}>
          All
        </Menu.Item>
        <Menu.Item key="basketball" style={{ width: '25%', textAlign: 'center' }}>
          Basketball
        </Menu.Item>
        <Menu.Item key="baseball" style={{ width: '25%', textAlign: 'center' }}>
          Baseball
        </Menu.Item>
        <Menu.Item key="sneakers" style={{ width: '25%', textAlign: 'center' }}>
          Sneakers
        </Menu.Item>
      </Menu>
    )
  }
}

export default CategoryMenu;
