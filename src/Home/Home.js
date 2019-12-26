import React, { PureComponent } from 'react';

import ProgressBar from './components/ProgressBar';
import ButtonBar from './components/ButtonBar';
import styles from './Home.scss';
import services from './services';
import Spinner from '../images/spinner.gif';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bars: [],
      buttons: [],
      limit: 0,
    };
  }

  componentDidMount() {
    services.fetchBarLists(this.onFetchSuccess);
  }

  onFetchSuccess = (data) => {
    const {
      bars, limit, buttons,
    } = data;

    this.setState({
      isLoading: false, bars, buttons, limit,
    });

    const parentElement = document.getElementById('complete0');
    const maxWidth = getComputedStyle(parentElement).width;

    bars.map((number, index) => {
      const element = document.getElementById(`progress${index}`);
      if (element) {
        element.style.width = `${(number * parseFloat(maxWidth)) / limit}px`;
      }
      return true;
    });
    return bars;
  }

  renderMultipleBars = () => {
    const { bars, limit } = this.state;
    const progressBarLists = bars && bars.map((number, index) => (
      <ProgressBar
        key={`bar${index}`}
        value={number}
        progressBarId={index}
        limit={limit}
      />
    ));
    return progressBarLists;
  }

  renderButton = () => {
    const { bars, buttons, limit } = this.state;
    return (
      <ButtonBar
        bars={bars}
        buttons={buttons}
        limit={limit}
        onClickCallback={this.onClickButton}
      />
    );
  }

  onClickButton = (newBars) => {
    this.setState({ bars: newBars });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className={styles.listBars}>
        { isLoading
          ? <img src={Spinner} className={styles.searchLoading} alt="loader" />
          : (
            <div className={styles.content}>
              <div className={styles.title}>Progress Bars Demo</div>
              {this.renderMultipleBars()}
              {this.renderButton()}
            </div>
          )}
      </div>
    );
  }
}

export default Home;
