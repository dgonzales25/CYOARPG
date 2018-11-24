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

export const addCharacter = functions.https.onCall((data, context) => {
    console.info('************ ' + data.game);
    createGame(data.game);
    const character: firebase.firestore.DocumentReference = firestore.collection('characters').doc();
    const game: firebase.firestore.DocumentReference = firestore.collection('games').doc(data.game);
    const player: firebase.firestore.DocumentReference = firestore.collection('players').doc(context.auth.uid);
    character.set({
        game: game,
        name: data.name,
        race: data.race,
        class: data.class,
        stats: data.stats,
        skills: data.skills,
        items: data.items,
        equipment: data.equipment,
        money: data.money
    }).catch(err => {
        console.error(err);
        throw new functions.https.HttpsError('aborted', 'failed writing character');
    });
    game.update({
        characters: firebase.firestore.FieldValue.arrayUnion(character),
        players: firebase.firestore.FieldValue.arrayUnion(player)
    }).catch(err => {
        console.error(err);
        throw new functions.https.HttpsError('aborted', 'failed writing game');
    });
    player.update({
        characters: firebase.firestore.FieldValue.arrayUnion(character)
    }).catch(err => {
        console.error(err);
        throw new functions.https.HttpsError('aborted', 'failed writing character');
    });
    
});


function createGame(game) {
    firestore.collection('games').doc(game).get()
        .then(doc => {
            if (!doc.exists) {
                game.set({
                    players: [],
                    characters: [],
                    encounter: firestore.collection('encounters').doc('start')
                })
                .then(() => {
                    console.log('created game');
                })
                .catch(err => {
                    console.error('Error creating game', err);
                    throw new functions.https.HttpsError('aborted', 'failed creating game');
                });
            }
        })
        .catch(err => {
            console.error('Error getting game', err);
            throw new functions.https.HttpsError('aborted', 'failed getting game');
        });
    
}