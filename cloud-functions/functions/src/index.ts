import * as functions from 'firebase-functions';
import * as firebase from 'firebase';

const firebaseObject = firebase.initializeApp({
    apiKey: 'AIzaSyClfMUoZTPc3XAemuJWepNda73AKrtb0jM',
    authDomain: 'chooseyourownadventure-3d5cb.firebaseapp.com',
    databaseURL: 'https://chooseyourownadventure-3d5cb.firebaseio.com',
    projectId: 'chooseyourownadventure-3d5cb',
    storageBucket: 'chooseyourownadventure-3d5cb.appspot.com',
    messagingSenderId: '14331628412'
  });

const firestore = firebase.firestore();  
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export const addUserToFirestore = functions.auth.user().onCreate((user) => {
    return firestore.collection('players').doc(user.uid).set({
        id: user.uid,
        username: user.displayName,
        email: user.email,
        characters: []
    }).then(() => {
        console.log("succesfully added " + user);
    }).catch((err) => {
        console.log(err);
    })
});
