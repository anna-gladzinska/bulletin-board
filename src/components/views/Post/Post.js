/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPost, getLoadingState } from '../../../redux/postsRedux.js';
import { initialState } from '../../../redux/initialState.js';

import styles from './Post.module.scss';
import Button from '@material-ui/core/Button';

class Component extends React.Component {
  
static propTypes = {
  className: PropTypes.string,
  posts: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  fetchPostById: PropTypes.func,
  loading: PropTypes.shape({
    active: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]), 
  }),
};

componentDidMount(){
  const { fetchPostById } = this.props;
  fetchPostById();
}

render(){ 
  const {className, loading: { active, error }, posts} = this.props;

  if(active || !posts){
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Posts</h2><br />
        <p>Loading...</p>
      </div>
    );
  } else if(error) {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Post</h2>   
        <p>Error! Details:</p>
        <pre>{error}</pre>
      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Post</h2>
        Author: {posts.author}<br />
        Created: {posts.created}<br />
        Updated: {posts.updated}<br />
        Status: {posts.status}<br />
        Title: {posts.title}<br />
        Text: {posts.text}<br />
        Photo: <img src={posts.photo} alt="AddPhoto"></img><br />
        Price: {posts.price}<br />
        Phone: {posts.phone}<br />
        Location: {posts.location}<br />
        {initialState.logged ? <a href={posts._id + '/edit'}><Button variant="contained" color="primary">Edit</Button></a> : null}
      </div>
    );
  }
}
}

const mapStateToProps = state => ({
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPostById: (id=props.match.params.id) => dispatch(fetchPost(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
