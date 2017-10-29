import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
      <div>
        <img className={styles.imageStyle} src={'https://image.ibb.co/diG8Qm/Logo.png'} />
        A way to equalize and compare offers across the country to find the best offer financially
      </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
