import React, { Component } from 'react';
import { databaseRef, auth } from '../../../../tools/firebase';
import { Spin, Icon, Popover } from 'antd';
import Paragraph from './Paragraph/Paragraph';
import Comments from './Comments/Comments';
import { Route } from 'react-router-dom';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      loading: true,
      loggedIn: false,
    }
  }
  componentDidMount() {
    databaseRef.child(`articles/${this.props.match.params.article}`).once('value', snapshot => {
      this.setState({
        article: snapshot.val(),
        loading: false,
      });
    });
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const spin = this.state.loading ? (<div style={{ textAlign: 'center' }}><Spin/></div>) : null;
    const content = (
      <div>
        <h3>Edit this article</h3>
      </div>
    );
    const { article, loggedIn } = this.state;
    return(
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {spin}
        {article &&
          <div>
            <h3 style={{ fontSize: '2.2rem'}}>
              { article.title }
              { loggedIn &&
                <Route
                  render={({history}) => (
                    <Popover content={content} placement="right" >
                      <Icon type="edit"
                        style={{ fontSize: '1.6rem', color: '#949494', cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() => {history.push(`/admin/editarticle/${this.props.match.params.article}`)}}
                      />
                    </Popover>
                  )}
                />
              }
            </h3>
            <div style={{ marginBottom: '36px' }}>
              { article.paragraphs.map((p, index) =>
                <Paragraph
                  key={index}
                  paragraph={p}
                />
              )}
            </div>
            <Comments articleKey={this.props.match.params.article}/>
          </div>
        }

      </div>
    )
  }
}

export default ArticlePage;
