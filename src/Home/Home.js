import React, { PureComponent } from 'react';

import ProgressBar from './components/ProgressBar';
import ButtonBar from './components/ButtonBar';
import styles from './Home.scss';
import services from './services';
import Spinner from '../images/spinner.gif';
import constant from './constant';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bars: [],
      buttons: [],
      limit: 0,
      maxWidth: 0,
    };
    this.progressRefs = [];
  }

  componentDidMount() {
    services.fetchBarLists(this.onFetchSuccess);
  }

  setRef = (ref) => {
    this.progressRefs.push(ref);
  };

  onFetchSuccess = (data) => {
    const {
      bars, limit, buttons,
    } = data;

    this.setState({
      isLoading: false, bars, buttons, limit,
    });

    const parentElement = this.progressRefs[0].refs.complete0;
    const maxWidth = parentElement.offsetWidth;
    this.setState({ maxWidth });

    bars.map((number, index) => {
      const element = this.progressRefs[index].refs[`progress${index}`];
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
        ref={this.setRef}
        key={`bar${index}`}
        value={number}
        progressBarId={index}
        limit={limit}
      />
    ));
    return progressBarLists;
  }

  renderButton = () => {
    const {
      bars, buttons, limit, maxWidth,
    } = this.state;
    return (
      <ButtonBar
        bars={bars}
        buttons={buttons}
        limit={limit}
        onClickCallback={this.onClickButton}
        maxWidth={maxWidth}
        progressRefs={this.progressRefs}
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
              <div className={styles.title}>{constant.title}</div>
              {this.renderMultipleBars()}
              {this.renderButton()}
            </div>
          )}
      </div>
    );
  }
}

export default Home;
