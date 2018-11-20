import { PlayerService } from './../services/player.service';
import { Class, Character, Wallet } from './../models';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Race } from '../models';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent {

  profileForm = this.fb.group({
    name: ['', Validators.required],
    game: ['', Validators.required],
    race: ['', Validators.required],
    class: ['', Validators.required]
  });

  classes = Class;
  races = Race;
  raceKeys;
  classKeys;

  constructor(private fb: FormBuilder, public playerService: PlayerService) {
    this.raceKeys = Object.keys(this.races).filter(Number);
    this.classKeys = Object.keys(this.classes).filter(Number);
  }

  onSubmit() {
    console.log(this.profileForm.value);
    // TODO create cloud function to create game and add character
    this.playerService.addCharacter(
    {
      id: '',
      game: null,
      name: this.profileForm.value.name,
      race: this.profileForm.value.race,
      class: this.profileForm.value.class,
      stats: {
        health: 1,
        mana: 1,
        strength: 1,
        defense: 1,
        magic: 1,
        resistance: 1,
        agility: 1
      },
      skills: [],
      items: [],
      equipment: [],
      money: null
    });
  }
}
