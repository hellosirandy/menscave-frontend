import React, { Component } from 'react';
import { Row, Col, Button, Dropdown, Menu, Icon } from 'antd';
import TextInput from './TextInput/TextInput';

export default class Paragraph extends Component {

  render() {
    const { paragraph, paragraphNum, form } = this.props;
    const dropdownMenu = (
      <Menu style={{ minWidth: 100 }}>
        <Menu.SubMenu title={(<span><Icon type="file-add" style={{ marginRight: 5 }} />Text</span>)}>
          <Menu.Item>Single</Menu.Item>
          <Menu.Item>Split</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>
          <a>
            <Icon type="picture" style={{ marginRight: 5 }} />Image
          </a>
        </Menu.Item>
      </Menu>
    );
    const inputField = paragraph.type === 'image' ? null : (
      <TextInput form={form} paragraph={paragraph}/>
    )
    return (
      <div style={{ marginBottom: 24 }}>
        <Row style={{ height: 40, borderBottom: '1px dashed #cfcfcf', lineHeight: '40px' }}>
          <Col span={18}>
            <h3>Paragraph { paragraphNum }</h3>
          </Col>
          <Col span={6}>
            <div style={{ float: 'right' }}>
              <Button type="danger" shape="circle" icon="minus" size="small"
                style={{ marginRight: 5}}
                ghost
              />
              <Dropdown overlay={dropdownMenu} trigger={['click']}>
                <Button type="primary" shape="circle" icon="plus" size="small"
                  ghost
                />
              </Dropdown>
            </div>
          </Col>
        </Row>
        { inputField }
      </div>
    )
  }
}
