import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCVLhnewKfF3yC_JMrGkuBse_HEna4mtn8',
  authDomain: 'wireless-buzz-52304.firebaseapp.com',
  databaseURL: 'https://wireless-buzz-52304-default-rtdb.firebaseio.com',
  projectId: 'wireless-buzz-52304',
  storageBucket: 'wireless-buzz-52304.appspot.com',
  messagingSenderId: '264862570991',
  appId: '1:264862570991:web:25a941ca55424e3882fe1a',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app.database();
