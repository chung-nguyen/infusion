import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDoxByZLqNDVec6nI2ATpzUyu3jrZ1kTbA",
    authDomain: "infusionaug8.firebaseapp.com",
    databaseURL: "https://infusionaug8.firebaseio.com",
    storageBucket: "infusionaug8.appspot.com"
};

export const initializeFirebase = () => {
    firebase.initializeApp(config);
};