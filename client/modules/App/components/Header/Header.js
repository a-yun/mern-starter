import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
      <div>
        <img className={styles.imageStyle} src={'https://image.ibb.co/diG8Qm/Logo.png'} />
        <label className={styles.labelStyle}> Compare your offers to find the best financial choice. </label>
      </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
