import { LoginService } from './../services/login.service';
import { Character, Player } from './../models';
import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent {
  characters: Character[];
  player: Player;

  constructor(private playerService: PlayerService, private loginService: LoginService) {
    loginService.user.subscribe((user) => {
      this.playerService.currentPlayer.subscribe((playerSnapshot) => {
        this.player = playerSnapshot.data();
        this.characters = this.player.characters;
        console.log(this.player);
        console.log(this.characters);
      });
    });
  }

}
