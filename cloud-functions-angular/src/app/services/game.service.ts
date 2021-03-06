import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentGame: Game;

  constructor(private db: AngularFirestore) { }

  loadGame(gameToLoad: DocumentReference) {
    gameToLoad.get()
    .then((game) => {
      this.currentGame = <Game> game.data();
      console.log(this.currentGame);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

