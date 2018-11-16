import { Player } from './../models';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentPlayer: Player;

  constructor(private db: AngularFirestore) { }

  loadPlayer(playerToLoad: DocumentReference) {
    playerToLoad.get()
    .then((player) => {
      this.currentPlayer = <Player> player.data();
      console.log(this.currentPlayer);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  createPlayer(playerToCreate: Player) {
    this.db.collection('players').doc(playerToCreate.id).set(playerToCreate)
      .then(() => this.currentPlayer = playerToCreate)
      .catch((err) => console.error(err));
  }
}
