import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import { Route } from 'react-router-dom';

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = (e) => {
    this.props.updateCategory(e.key);
  }

  render() {
    return(
      <div>
        <div style={{ float: 'right', marginRight: 24, marginTop: 8 }}>
          <Route
            render={({ history }) => (
              <Button type="dashed" shape="circle" icon="plus" size="large"
                onClick={() => {history.push('/admin/newarticle')}}/>
            )}
          />
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.props.category]}
          mode="horizontal"
          theme="light"
        >
          <Menu.Item key="latest">
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

        </Menu>

      </div>
    )
  }
}

export default CategoryMenu;
