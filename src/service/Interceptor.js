import axios from 'axios';

axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");
      if (token) {
          config.headers.common.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  
  
  axios.interceptors.response.use(
      response => {
        //Not logged in or session expired
        if ('401' === response.data.code) {
          //Redirect to login page
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
        }
        return response;
      },
      error => {
        if (500 === error.response.status) {
          //Server exception  
        }
        return  Promise.reject (error) // returns the error information returned by the interface
      }
    );