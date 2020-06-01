import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished, getLoadingState } from '../../../redux/postsRedux.js';
import { initialState } from '../../../redux/initialState.js';

import styles from './Homepage.module.scss';
import Button from '@material-ui/core/Button';

class Component extends React.Component {
  
static propTypes = {
  className: PropTypes.string,
  posts: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  fetchPublishedPosts: PropTypes.func,
  loading: PropTypes.shape({
    active: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]), 
  }),
};

componentDidMount(){
  const { fetchPublishedPosts } = this.props;
  fetchPublishedPosts();
}

render(){ 
  const {className, loading: { active, error }, posts} = this.props;

  if(active || !posts.length){
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.title}>
          <h2>Posts</h2><br />
        </div>
        <p>Loading...</p>
      </div>
    );
  } else if(error) {
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.title}>
          <h2>Posts</h2><br />
        </div>
        <p>Error! Details:</p>
        <pre>{error}</pre>
      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.title}>
          <h2>Posts</h2>
          {initialState.logged ? <a href="/post/add"><Button variant="contained" color="primary">+ New post</Button></a> : null}
        </div>        
        {posts.map(post => {
          return (
            <div key={post.id}>
              <a href={'post/'+ post._id}>{post.title} ({post.created})</a><br />
            </div>
          );
        })}
      </div>
    );
  }
}
}

const mapStateToProps = state => ({
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
