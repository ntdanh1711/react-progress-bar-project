/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import Home from '../Home/Home';

const setup = () => {
  const wrapper = shallow(<App />);
  return { wrapper };
};

describe('WelcomeMessage Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Home).exists()).toBe(true);
  });
});
