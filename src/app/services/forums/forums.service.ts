import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ForumModel } from 'src/app/models/forum/forumModel';

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  private collectionForumName = "/forums";
  private collectionForumFirestore: AngularFirestoreCollection<ForumModel>;

  constructor(firestore: AngularFirestore) { 
    this.collectionForumFirestore = firestore.collection<ForumModel>(this.collectionForumName);
  }

  getAllForums(){
    // return this.collectionForumFirestore.snapshotChanges()
    // .pipe(
    //     map(actions => 
    //       actions.map(function(e){
    //       return {
    //         doc: e.payload.doc.id,
    //         ...e.payload.doc.data()
    //       } as ForumModel
    //     })
    //   )
    // )

    return this.collectionForumFirestore.valueChanges();
  }
}
