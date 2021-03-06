import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBar.scss';

class ProgressBar extends PureComponent {
  render() {
    const { progressBarId, value, limit } = this.props;
    const percentage = Math.floor((value / limit) * 100);
    return (
      <div ref={`complete${progressBarId}`} id={`complete${progressBarId}`} className={styles.progressBar}>
        <div
          ref={`progress${progressBarId}`}
          id={`progress${progressBarId}`}
          className={`${styles.completeBar} ${(percentage > 100)
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
