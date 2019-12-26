import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBar.scss';

class ProgressBar extends PureComponent {
  render() {
    const { progressBarId, value, limit } = this.props;
    const percentage = Math.floor((value / limit) * 100);
    return (
      <div id={`complete${progressBarId}`} className={styles.progressBar}>
        <div
          id={`progress${progressBarId}`}
          className={`${styles.completeBar} ${(value - limit >= 1)
            ? styles.overLimitColor
            : styles.limitColor}`}
        />
        <div className={styles.completeValue}>
          {percentage}
          %
        </div>

        <div />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progressBarId: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default ProgressBar;
