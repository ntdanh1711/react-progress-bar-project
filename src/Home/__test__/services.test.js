/* eslint-disable no-undef */
import sinon from 'sinon';
import axios from 'axios';
import services from '../services';

describe('fetchBarLists', () => {
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

  afterEach(() => {
    sinon.restore();
  });

  it('Call fetchBarLists and return data', () => {
    const onSuccessCallback = sinon.spy();
    const expectedResult = {
      buttons: [10, 38, -13, -18],
      bars: [62, 45, 62],
      limit: 230,
    };
    services.fetchBarLists(onSuccessCallback);
    setTimeout(() => {
      sinon.assert.calledWith(onSuccessCallback, expectedResult);
    });
  });
});
