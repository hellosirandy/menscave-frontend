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
        <Menu.Item key="all">
          All
        </Menu.Item>
        <Menu.Item key="basketball">
          Basketball
        </Menu.Item>
        <Menu.Item key="baseball">
          Baseball
        </Menu.Item>
        <Menu.Item key="sneakers">
          Sneakers
        </Menu.Item>
      </Menu>
    )
  }
}

export default CategoryMenu;
