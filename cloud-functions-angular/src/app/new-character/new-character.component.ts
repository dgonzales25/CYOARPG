import { Class } from './../models';
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

  constructor(private fb: FormBuilder) {
    this.raceKeys = Object.keys(this.races).filter(Number);
    this.classKeys = Object.keys(this.classes).filter(Number);
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
