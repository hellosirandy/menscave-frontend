import React, { Component } from 'react';
import { Row, Col, Button, Dropdown, Menu, Icon } from 'antd';
import TextInput from './TextInput/TextInput';
import ImageInput from './ImageInput/ImageInput';

export default class Paragraph extends Component {

  render() {
    const { paragraph, paragraphNum, form, addParagraph, removeParagraph } = this.props;
    const dropdownMenu = (
      <Menu style={{ minWidth: 100 }}>
        <Menu.SubMenu title={(<span><Icon type="file-add" style={{ marginRight: 5 }} />Text</span>)}>
          <Menu.Item><a onClick={() => {addParagraph(paragraphNum - 1, 'single')}}>Single</a></Menu.Item>
          <Menu.Item><a onClick={() => {addParagraph(paragraphNum - 1, 'split')}}>Split</a></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>
          <a onClick={() => {addParagraph(paragraphNum - 1, 'image')}}>
            <Icon type="picture" style={{ marginRight: 5 }} />Image
          </a>
        </Menu.Item>
      </Menu>
    );
    const inputField = paragraph.type === 'image' ? (<ImageInput form={form} paragraph={paragraph}/>) : (
      <TextInput form={form} paragraph={paragraph}/>
    )
    return (
      <div style={{ marginBottom: 24 }}>
        <Row style={{ height: 40, borderBottom: '1px dashed #cfcfcf', lineHeight: '40px', marginBottom: 12 }}>
          <Col span={18}>
            <h3>Paragraph { paragraphNum }</h3>
          </Col>
          <Col span={6}>
            <div style={{ float: 'right' }}>
              <Button type="danger" shape="circle" icon="minus" size="small"
                style={{ marginRight: 5}}
                ghost
                onClick={() => {removeParagraph(paragraph.key)}}
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
