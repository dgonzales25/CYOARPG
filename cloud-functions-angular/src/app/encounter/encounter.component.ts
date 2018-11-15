import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference } from 'angularfire2/firestore';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent {

  currentEncounter: DocumentData;
  currentScenario: string;


  constructor(private db: AngularFirestore) {
    db.collection('encounters').doc('229OMVkHu6G1GzN7pGm8').get().subscribe((encounter) => {
        this.currentEncounter = encounter.data();
        console.log(this.currentEncounter);
    });
  }


  changeEncounter(transition: Transition) {
    // this.db.collection('encounters').doc
    // console.log(transition);
    transition.encounter.get()
      .then((encounter) => {
        this.currentEncounter = encounter.data();
        console.log(this.currentEncounter);
      })
      .catch((err) => {
        console.error(err);
      });
    }
}

class Transition {
  encounter: DocumentReference;
  text: string;
}
