import { LoginService } from './../services/login.service';
import { Character, Player } from './../models';
import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent {
  characters: Character[];
  player: Player;

  constructor(private playerService: PlayerService, private loginService: LoginService, private db: AngularFirestore) {
    loginService.user.subscribe((user) => {
      this.playerService.currentPlayer.subscribe((playerSnapshot) => {
        this.player = playerSnapshot.data();
        this.player.characters.forEach(ref => {
            ref.get().then(character => {
              this.characters.push(<Character> character.data());
            });
        });
        console.log(this.player);
        console.log(this.characters);
      });
    });
  }

}
