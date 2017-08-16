import React, { Component } from 'react';
import { Select, Input, Row, Col, Button, Form, message } from 'antd';
import DynamicInputField from './DynamicInputField/DynamicInputField';
import DynamicInput from './DynamicInput/DynamicInput';
import { databaseRef } from '../../../../../tools/firebase';
import { Route } from 'react-router-dom';
const Option = Select.Option;
const FormItem = Form.Item;

class EditArticleForm extends Component {
  onSubmit = (history, e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveArticle(values, history);
      }
    });
  };

  saveArticle = (values, history) => {
    const { article, articleKey } = this.props;
    const paragraphs = values.paragraphs.filter(paragraph => {
      return paragraph;
    });
    console.log(paragraphs);
    // values.paragraphs = paragraphs;
    // let articleRef;
    // if (article) {
    //   values.createTime = article.createTime;
    //   values.comments = article.comments ? article.comments : [];
    //   articleRef = databaseRef.child(`articles/${articleKey}`);
    // } else {
    //   values.createTime = new Date().getTime();
    //   articleRef = databaseRef.child('articles').push();
    // }
    // values.updateTime = new Date().getTime();
    // console.log(values);
    //
    // articleRef.set(values).then(res => {
    //   message.success('The article has been saved.', 3);
    //   history.push('/home');
    //   // return databaseRef.child('previews').push().set({ articleKey: articleRef.key, category: article.category, createTime: article.createTime });
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Route
        render={({ history }) => (
          <Form onSubmit={this.onSubmit.bind(this, history)}>
            <Row gutter={20} style={{ marginBottom: 24 }}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <FormItem label="Title" >
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title!' }],
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue: this.props.article ? this.props.article.title : '',
                  })(
                    <Input size="large" placeholder="Input article title"/>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <FormItem label="Category">
                  {getFieldDecorator('category', this.props.article ? {
                    rules: [{ required: true, message: 'Please select a category!' }],
                    initialValue: this.props.article ? this.props.article.category : null,
                  } : {
                    rules: [{ required: true, message: 'Please select a category!' }],
                  })(
                    <Select
                      placeholder="Select a category"
                    >
                      <Option value="basketball">Basketball</Option>
                      <Option value="baseball">Baseball</Option>
                      <Option value="sneakers">Sneakers</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
            <DynamicInput
              form={this.props.form}
              paragraphs={this.props.article ? this.props.article.paragraphs : []}
            />
            {/* <DynamicInputField form={this.props.form} paragraphs={this.props.article ? this.props.article.paragraphs : null}/> */}

            <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24}>
                <Button type="primary" icon="save" size="large"
                  style={{ float: 'right' }}
                  htmlType="submit">
                   Save
                </Button>

              </Col>
            </Row>
          </Form>
        )}
      />

    )
  }
}

export default EditArticleForm;
