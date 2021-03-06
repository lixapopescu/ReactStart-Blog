import React, {Component} from 'react';
import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component{
  //when the component  is about to be rendered for the first time
  componentWillMount(){
    console.log('This would be a good time to call an action creator to fetch posts.');
    this.props.fetchPosts();
  }

  renderPosts(){
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      );
    });
  }

  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary"> Add a post </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchPosts}, dispatch);
// }
//
//
function mapsStateToProps(state){
  return {posts: state.posts.all};
}

export default connect(mapsStateToProps, {fetchPosts})(PostsIndex);
