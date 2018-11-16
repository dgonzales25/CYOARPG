import { LoginService } from './login.service';
import { Player } from './../models';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
}
