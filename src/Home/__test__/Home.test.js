/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';
import ProgressBar from '../components/ProgressBar';
import ButtonBar from '../components/ButtonBar';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Home />);
});

describe('Home Test render', () => {
  it('Should have an image of loading', () => {
    expect(wrapper.find('img').exists()).toBe(true);
  });
});

describe('onFetchSuccess', () => {
  it('Call onFetchSuccess and return bars data', () => {
    const fakeData = {
      buttons: [10, 38, -13, -18],
      bars: [62, 45, 62],
      limit: 230,
    };
    window.getComputedStyle = jest.fn().mockReturnValue(100);
    expect(wrapper.instance().onFetchSuccess(fakeData)).toStrictEqual([62, 45, 62]);
  });
});

describe('renderMultipleBars', () => {
  it('Call renderMultipleBars and return ProgressBar array', () => {
    wrapper.setState({ bars: [62, 45, 62], limit: 230 });
    const result = [62, 45, 62].map((number, index) => (
      <ProgressBar
        key={`bar${index}`}
        value={number}
        progressBarId={index}
        limit={230}
      />
    ));
    expect(wrapper.instance().renderMultipleBars()).toStrictEqual(result);
  });

  it('Call renderMultipleBars and return empty ProgressBar array when state is null', () => {
    expect(wrapper.instance().renderMultipleBars()).toStrictEqual([]);
  });
});

describe('renderButton', () => {
  it('Call renderButton and return ButtonBar array', () => {
    wrapper.setState({ bars: [62, 45, 62], limit: 230, buttons: [10, 38, -13, -18] });
    const result = (
      <ButtonBar
        bars={[62, 45, 62]}
        buttons={[10, 38, -13, -18]}
        limit={230}
        onClickCallback={wrapper.instance().onClickButton}
      />
    );
    expect(wrapper.instance().renderButton()).toStrictEqual(result);
  });
});
