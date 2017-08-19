import React, { Component } from 'react';
import { Select, Input, Row, Col, Button, Form, message } from 'antd';
import DynamicInput from './DynamicInput/DynamicInput';
import { databaseRef } from '../../../../../tools/firebase';
import { Route } from 'react-router-dom';
import { Article } from '../../../../../models/article';
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
    const paragraphs = values.keys.map(k => {
      return values[`paragraphs-${k}`];
    });
    const updateArticle = new Article('', 0, 0, '', [], []);
    updateArticle.paragraphs = paragraphs;
    updateArticle.title = values.title;
    updateArticle.category = values.category;
    let articleRef;
    let previewRef;
    if (article) {
      updateArticle.createTime = article.createTime;
      updateArticle.comments = article.comments ? article.comments : [];
      articleRef = databaseRef.child(`articles/${articleKey}`);
      updateArticle.previewKey = article.previewKey;
      previewRef = databaseRef.child(`previews/${updateArticle.previewKey}`);
    } else {
      updateArticle.createTime = new Date().getTime();
      articleRef = databaseRef.child('articles').push();
      previewRef = databaseRef.child('previews').push();
      updateArticle.previewKey = previewRef.key;
    }
    updateArticle.updateTime = new Date().getTime();
    console.log(updateArticle);
    articleRef.set(updateArticle).then(res => {
      if (article) {
        return previewRef.update({category: updateArticle.category});
      } else {
        return previewRef.set({ articleKey: articleRef.key, category: updateArticle.category, createTime: updateArticle.createTime });
      }
      // return preview.update({category: updateArticle.category});
    }).then(() => {
      message.success('The article has been saved.', 3);
      history.push('/home');
    }).catch(err => {
      console.log(err);
    });
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
