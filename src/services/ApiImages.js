import axios from 'axios';
import uuid from 'uuid';
import * as SecureStore from 'expo-secure-store'
import reducePostAsync from '../utils/shrinkPostAsync';

const apiPosts = axios.create({
  baseURL: 'http://192.168.1.103:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    
  },
});

export default apiPosts;

const collectionName = '/api/user/posts'

class ApiPosts{
  constructor(){
    axios.create({
      baseURL: 'http://192.168.1.103:8000',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      },
    });
  }// Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

;

  post = async ({ text, post: localUri }) => {
    try {
      const { uri: reducedPost, width, height } = await reducePostAsync(
        localUri,
      );

      axios.post(collectionName)({
        description: text,
        //uid: this.uid,
        //timestamp: this.timestamp,
        //postWidth: width,
        //postHeight: height,
        url: reducedPost,
        //user: getUserInfo(),
      });
    }catch ({ message }) {
      alert(message);
    }
  };

  get uid() {
    $user = SecureStore.getItemAsync('user')
    return $user.id
  }
  get timestamp() {
    return Date.now();
  }
}

ApiPosts.shared = new ApiPosts();
//export default ApiPosts;

/*
const api = axios.create({
  baseURL: 'http://192.168.1.103:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
});



// Set up the interceptors
api.interceptors.request.use(
  function (config) {
    // Set the Authorization header with the token
    const user = SecureStore.getItemAsync('user');
    //console.log("User from SecureStore: ", user);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      //console.log("User token ", user.token)
    }
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

export default api;*/