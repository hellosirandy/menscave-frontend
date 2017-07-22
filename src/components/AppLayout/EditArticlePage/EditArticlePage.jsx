import React, { Component } from 'react';
import { Select, Input, Row, Col, Button } from 'antd';
import DynamicInputField from './DynamicInputField/DynamicInputField';
import { saveArticle } from '../../../tools/firebase';
const Option = Select.Option;
const { TextArea } = Input;

class EditArticlePage extends Component {
  constructor(props) {
    super(props)
    this.onSelectChange = this.onSelectChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  onSelectChange(value) {
    console.log(`selected ${value}`);
  }

  saveArticle() {
    console.log('hiihih');
    saveArticle();
  }

  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Row gutter={20} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <label htmlFor="">Title</label>
            <Input size="large" placeholder="Input article title" />

          </Col>
          <Col span={12}>
            <label htmlFor="">Category</label>
            <Select defaultValue="select" size="large" style={{ width: '100%' }} onChange={this.onSelectChange}>
              <Option value="select" disabled>Select a category</Option>
              <Option value="basketball">Basketball</Option>
              <Option value="baseball">Baseball</Option>
              <Option value="sneakers">Sneakers</Option>
            </Select>
          </Col>
        </Row>
        <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
        <DynamicInputField/>

        <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Button type="primary" icon="save" size="large"
              style={{ float: 'right' }}
              onClick={this.saveArticle}>
               Save
            </Button>

          </Col>
        </Row>
      </div>
    )
  }
}

export default EditArticlePage;
