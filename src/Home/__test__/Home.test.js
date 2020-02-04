/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';
import ProgressBar from '../components/ProgressBar';
import ButtonBar from '../components/ButtonBar';

let wrapper;

const progressRefs = [{
  refs: {
    complete0: {
      offsetWidth: 379,
    },
    progress0: {
      style: {
        width: 100,
      },
    },
  },
},
{
  refs: {
    complete1: {
      offsetWidth: 379,
    },
    progress1: {
      style: {
        width: 150,
      },
    },
  },
}];

beforeEach(() => {
  wrapper = shallow(<Home />);
  wrapper.instance().progressRefs = progressRefs;
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
      bars: [62, 45],
      limit: 230,
    };
    const expectedElementWidth = `${(fakeData.bars[0] * 379) / 230}px`;
    const expectedResult = wrapper.instance().onFetchSuccess(fakeData);
    const updatedElement = wrapper.instance().progressRefs[0].refs.progress0;

    expect(expectedResult).toStrictEqual([62, 45]);
    expect(updatedElement.style.width).toEqual(expectedElementWidth);
  });
});

describe('renderMultipleBars', () => {
  it('Call renderMultipleBars and return ProgressBar array', () => {
    wrapper.setState({ bars: [62, 45], limit: 230 });
    const result = [62, 45].map((number, index) => (
      <ProgressBar
        ref={wrapper.instance().setRef}
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
    wrapper.setState({
      bars: [62, 45], limit: 230, buttons: [10, 38, -13, -18], maxWidth: 379,
    });
    const result = (
      <ButtonBar
        bars={[62, 45]}
        buttons={[10, 38, -13, -18]}
        limit={230}
        onClickCallback={wrapper.instance().onClickButton}
        maxWidth={379}
        progressRefs={wrapper.instance().progressRefs}
      />
    );
    expect(wrapper.instance().renderButton()).toStrictEqual(result);
  });
});
