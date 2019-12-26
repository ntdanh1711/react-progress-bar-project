/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '../ProgressBar';

let wrapper;
const props = {
  progressBarId: 1,
  value: 115,
  limit: 230,
};

beforeEach(() => {
  wrapper = shallow(<ProgressBar {...props} />);
});

describe('Progress Bar Test render', () => {
  it('Should have an select and input', () => {
    expect(wrapper.find('#progress1').exists()).toBe(true);
    expect(wrapper.find('#complete1').exists()).toBe(true);
  });
});
