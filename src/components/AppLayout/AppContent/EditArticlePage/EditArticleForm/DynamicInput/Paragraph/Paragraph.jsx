import React, { Component } from 'react';
import { Row, Col, Button, Dropdown, Menu, Icon } from 'antd';
import TextInput from './TextInput/TextInput';
import ImageInput from './ImageInput/ImageInput';
import VideoInput from './VideoInput/VideoInput';

export default class Paragraph extends Component {

  render() {
    const { paragraph, paragraphNum, form, addParagraph, removeParagraph } = this.props;
    const dropdownMenu = (
      <Menu style={{ minWidth: 100 }}>
        <Menu.Item>
          <a onClick={() => {addParagraph(paragraphNum - 1, 'single')}}>
            <Icon type="file-text" style={{ marginRight: 5 }} />Single
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => {addParagraph(paragraphNum - 1, 'split')}}>
            <Icon type="copy" style={{ marginRight: 5 }} />Split
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => {addParagraph(paragraphNum - 1, 'image')}}>
            <Icon type="picture" style={{ marginRight: 5 }} />Image
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => {addParagraph(paragraphNum - 1, 'video')}}>
            <Icon type="video-camera" style={{ marginRight: 5 }} />Video
          </a>
        </Menu.Item>
      </Menu>
    );
    const inputField = paragraph.type === 'image' ? (<ImageInput form={form} paragraph={paragraph}/>) : (
      paragraph.type === 'video' ? (<VideoInput form={form} paragraph={paragraph}/>) : (
        <TextInput form={form} paragraph={paragraph}/>
      )
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
