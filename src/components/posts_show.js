import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class PostShow extends Component {
  static contextTypes= {
    router: PropTypes.object
  };

  componentWillMount(){
    console.log('Mount show post', this.props.params.id);
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick(){
    this.props.deletePost(this.props.params.id)
      .then(() => {this.context.router.push('/')});
  }

  render(){
    const {post} = this.props;

    if (!post){
      return <div>...</div>
    };
    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <Link to="/" className="btn">Back to list</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete post</button>
      </div>
    );
  }
}

function mapsStateToProps(state){
  return {post: state.posts.post};
}

export default connect(mapsStateToProps, {fetchPost, deletePost})(PostShow);
