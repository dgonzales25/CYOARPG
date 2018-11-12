import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from 'angularfire2/firestore';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent {

  currentEncounter: DocumentData;
  currentScenario: string;


  constructor(db: AngularFirestore) {
    db.collection('encounters').doc('229OMVkHu6G1GzN7pGm8').get().subscribe((encounter) => {
        this.currentEncounter = encounter.data();
        console.log(this.currentEncounter);
    });
  }


}
