import { LoginService } from './login.service';
import { Player, Character } from './../models';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _currentPlayer: Observable<any>;
  private _player: Player;


  constructor(private db: AngularFirestore, loginService: LoginService) {
    loginService.user.subscribe((user) => {

      this._currentPlayer = this.db.collection('players').doc(user.uid).get();
      this.loadPlayer(user.uid);
    });
  }

  loadPlayer(uid: string) {
    this._currentPlayer.subscribe((player) => {
      this._player = <Player> player.data();
      console.log(this._player);
    });
  }

  get currentPlayer(): Observable<any> {
    return this._currentPlayer;
  }
  get player(): Player {
    return this._player;
  }

  addCharacter(character: Character) {
    const addCharacter = firebase.functions().httpsCallable('addCharacter');
    addCharacter(character).then(result => {
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    });

    // This does not add it just makes it the only character
    // Maybe send a reference? or have cloud function create objects
    // this.db.collection('players').doc(this._player.id).set(
    //   { characters: [character] }, { merge: true }
    // );

    // this.db.collection('players').doc(this._player.id).update({
    //   characters: firebase.firestore.FieldValue.arrayUnion(character)
    // });
  }
}
