import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes= {
    router: PropTypes.object
  };

  classNameFieldWithErrors(field){
    return `form-group ${field.touched && field.invalid ? 'has-danger': ''}`;
  }

  onSubmit(props){
    this.props.createPost(props)
      .then(() => {
        //blog post has been created => navigate the user to the index
        //we navigate by calling this.context.router.push with the new path to navigate to
        this.context.router.push('/');
      });
  }

  render(){
    const {fields: {title, categories, content}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create new post</h3>
          <div className={this.classNameFieldWithErrors(title)}>
            <label>Title</label>
            <input type="text" className="form-control" {...title}/>
            <div className="text-help">{title.touched ? title.error : ''}</div>
          </div>
          <div className={this.classNameFieldWithErrors(categories)}>
            <label>Catgeories</label>
            <input type="text" className="form-control" {...categories}/>
              <div className="text-help">{categories.touched ? categories.error : ''}</div>
          </div>
          <div className={this.classNameFieldWithErrors(content)}>
            <label>Body</label>
            <textarea className="form-control" {...content}/>
              <div className="text-help">{content.touched ? content.error : ''}</div>
          </div>

          <button type="submit" className="btn btn-primary"> Create </button>
          <Link to="/" className="btn btn-secondary">Clear and go back</Link>
      </form>
    );
  }
}

function validate(values){
  const errors={};

  if (!values.title){
    errors.title = 'Blog post without title? Really?'
  }
  if (!values.categories){
    errors.categories = 'I bet you can think of at least ONE category.'
  }
  if (!values.content){
    errors.content = 'Even tweeter has a limit of 140 characters. Take advantage to say something more than a headline.'
  }

  return errors;
}


//connect(mapsStateToProps, mapDispatchToProps)
//reduxForm(form config, mapsStateToProps, mapDispatchToProps)
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);
