/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ButtonBar from '../ButtonBar';

let wrapper;
const props = {
  bars: [62, 45, 62],
  buttons: [10, 38, -13, -18],
  limit: 230,
  onClickCallback: sinon.spy(),
};
beforeEach(() => {
  wrapper = shallow(<ButtonBar {...props} />);
});

describe('Button Bar Test render', () => {
  it('Should have an select and input', () => {
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });
});

describe('onChangeProgress', () => {
  it('Should call onClickCallback with new bars updated & newWidth < 0', () => {
    wrapper.setState({ barSelected: 'progress0', positionSelected: 0 });
    const event = {
      target: {
        value: 10,
      },
    };

    window.getComputedStyle = jest.fn().mockReturnValue(100);
    sinon.stub(document, 'getElementById').returns({ style: { width: 50 } });

    wrapper.instance().onChangeProgress(event);
    sinon.assert.calledWith(props.onClickCallback, [0, 45, 62]);
  });

  it('Should call onClickCallback with new bars updated & newWidth > 0', () => {
    wrapper.setState({ barSelected: 'progress0', positionSelected: 0 });
    const event = {
      target: {
        value: 10,
      },
    };

    window.getComputedStyle = jest.fn().mockReturnValue(100);
    // eslint-disable-next-line no-global-assign
    parseFloat = jest.fn().mockReturnValue(10);

    wrapper.instance().onChangeProgress(event);
    sinon.assert.calledWith(props.onClickCallback, [0, 45, 62]);
  });
});
