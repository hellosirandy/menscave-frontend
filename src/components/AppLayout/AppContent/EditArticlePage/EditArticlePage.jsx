import React, { Component } from 'react';
import EditArticleForm from './EditArticleForm/EditArticleForm';
import { Form } from 'antd';


class EditArticlePage extends Component {
  render() {
    const Edit = Form.create()(EditArticleForm);
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Edit/>

      </div>
    );
  }
}

export default EditArticlePage;
