import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Page not found!</h2>
    <p>Take me back to the <a href="/">Homepage</a></p>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
