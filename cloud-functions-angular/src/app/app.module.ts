/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatSnackBarModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';

import { AppComponent } from './app.component';
import { StylizePipe } from './stylize.pipe';
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { LoginService } from './services/login.service';
import { EncounterComponent } from './encounter/encounter.component';
import { GameService } from './services/game.service';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { NewCharacterComponent } from './new-character/new-character.component';

const configErrMsg = `You have not configured and imported the Firebase SDK.
Make sure you go through the codelab setup instructions.`;

const bucketErrMsg = `Your Firebase Storage bucket has not been enabled. Sorry
about that. This is actually a Firebase bug that occurs rarely. Please go and
re-generate the Firebase initialization snippet (step 4 of the codelab) and make
sure the storageBucket attribute is not empty. You may also need to visit the
Storage tab and paste the name of your bucket which is displayed there.`;

// TODO get new firebase account before deployment since key is compromised
if (!environment.firebase) {
  if (!environment.firebase.apiKey) {
    window.alert(configErrMsg);
  } else if (environment.firebase.storageBucket === '') {
    window.alert(bucketErrMsg);
  }
}

@NgModule({
   declarations: [
      AppComponent,
      StylizePipe,
      ChatComponent,
      HeaderComponent,
      EncounterComponent,
      CharacterSelectComponent,
      NewCharacterComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      MatSnackBarModule,
      ReactiveFormsModule,
      RouterModule.forRoot([
         {
            path: '',
            component: CharacterSelectComponent
         },
         {
            path: 'game/:id',
            component: EncounterComponent,
            canActivate: [AuthGuard]
         }
         // TODO add 404 page
         // {
         //    path: '**',
         //    component: NotFoundComponent
         // }
      ]),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule
   ],
   providers: [
      LoginService,
      GameService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
