/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import ButtonBar from '../ButtonBar';

let wrapper;
const props = {
  bars: [62, 45, 62],
  buttons: [10, 38, -13, -18],
  limit: 230,
  onClickCallback: jest.fn(),
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
