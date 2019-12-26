import axios from 'axios';
import constant from './constant';

const fetchBarLists = (onSuccessCallback) => {
  axios.get(constant.url).then((res) => {
    if (res.status === 200) {
      onSuccessCallback(res.data);
    }
  }).catch((error) => error);
};

export default { fetchBarLists };
