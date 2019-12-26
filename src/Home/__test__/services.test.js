/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import sinon from 'sinon';
import axios from 'axios';
import services from '../services';

beforeEach(() => {
  sinon.stub(axios, 'get').resolves(Promise.resolve({
    status: 200,
    data: {
      buttons: [10, 38, -13, -18],
      bars: [62, 45, 62],
      limit: 230,
    },
  }));
});

describe('fetchBarLists', () => {
  it('Call fetchBarLists and return data', () => {
    const spy = sinon.spy(services, 'fetchBarLists');
    const onSuccessCallback = () => {};
    spy(onSuccessCallback);
    spy.lastCall.onSuccessCallback === onSuccessCallback;
  });
});
