import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import { Route } from 'react-router-dom';

class CategoryMenu extends Component {
  constructor() {
    super();
    this.state = {
      current: 'new',
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return(
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="new">
          Latest
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
        <div style={{ float: 'right', marginRight: 24 }}>
          <Route
            render={({ history }) => (
              <Button type="dashed" shape="circle" icon="plus" size="Large"
                onClick={() => {history.push('/admin/newarticle')}}/>
            )}
          />
        </div>
      </Menu>
    )
  }
}

export default CategoryMenu;
