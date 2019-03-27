import axios from 'axios';
import { cookies } from 'react-cookie';
import { ApiServer } from '../Defaults';

const BaseAxios = axios.create({
  baseURL: ApiServer,
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`,
  },
});

// Configure interceptors
BaseAxios.interceptors.response.use(response => response,
  (error) => {
    if (error.response.request.responseURL.includes('oauth/token')) {
      return error.response;
    } if (error.response.status === 401) {
      cookies.remove('token');
      window.location.href = '/?signIn=true';
    }
    return Promise.reject(error);
  });

export default BaseAxios;
