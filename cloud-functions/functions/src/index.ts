import * as functions from 'firebase-functions';
import * as firebase from 'firebase';
import * as firebaseAdmin from 'firebase-admin';

const admin = firebaseAdmin.initializeApp();
const firebaseObject = firebase.initializeApp({
    databaseURL: admin.instanceId().app.options.databaseURL,
    projectId: admin.instanceId().app.options.projectId
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
