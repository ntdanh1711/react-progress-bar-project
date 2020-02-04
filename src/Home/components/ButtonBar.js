import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonBar.scss';

class ButtonBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      positionSelected: 0,
    };
  }

  onSelectChange = (e) => {
    const selectedValue = e.target.value;
    this.setState({
      positionSelected: selectedValue.substring(selectedValue.length - 1),
    });
  }

  onChangeProgress = (e) => {
    const {
      limit, bars, onClickCallback, maxWidth, progressRefs,
    } = this.props;
    const { positionSelected } = this.state;

    const selectedElement = progressRefs[positionSelected].refs[`progress${positionSelected}`];

    let newWidth = parseFloat(selectedElement.style.width);
    const valueChange = (parseFloat(e.target.value) * parseFloat(maxWidth)) / limit;
    newWidth += valueChange;
    const newBars = [...bars];

    if (newWidth > 0) {
      selectedElement.style.width = `${newWidth}px`;
      newBars[positionSelected] += parseFloat(e.target.value);
      onClickCallback(newBars);
    } else {
      selectedElement.style.width = '0px';
      newBars[positionSelected] = 0;
      onClickCallback(newBars);
    }
  }

  render() {
    const { bars, buttons } = this.props;
    return (
      <div className={styles.buttonBar}>
        <select onChange={this.onSelectChange} className={styles.numberButton}>
          {bars && bars.map((number, index) => (
            <option key={`select${index}`} value={`progress${index}`}>
              #progress
              {index}
            </option>
          ))}
        </select>
        {buttons && buttons.map((button, index) => (
          <input
            key={`button${index}`}
            type="button"
            className={styles.numberButton}
            value={button > 0 ? `+${button}` : button}
            onClick={this.onChangeProgress}
          />
        ))}
      </div>
    );
  }
}

ButtonBar.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.number).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
  limit: PropTypes.number.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  maxWidth: PropTypes.number.isRequired,
  progressRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonBar;
