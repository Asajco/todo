// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD3kMXdhdTYfrv4C9lzJCsvv6Wy2feUPzQ',
  authDomain: 'todo-12fae.firebaseapp.com',
  projectId: 'todo-12fae',
  storageBucket: 'todo-12fae.appspot.com',
  messagingSenderId: '317075747164',
  appId: '1:317075747164:web:ea768a24e307c78934d199',
  measurementId: 'G-E1008L4BYC',
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
