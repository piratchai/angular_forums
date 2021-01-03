import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ForumModel } from 'src/app/models/forum/forumModel';

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  private collectionForumName = "/forums";
  private collectionForumFirestore: AngularFirestoreCollection<ForumModel>;

  constructor(private firestore: AngularFirestore) { 
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

  getForum(doc){
    return this.collectionForumFirestore.doc(doc).get();
  }

  addForum(forum: ForumModel){
    var newUUID = this.firestore.createId();
    forum.doc = newUUID;
    forum.create_time = new Date();
    forum.update_time = new Date();
    return this.collectionForumFirestore
      .doc(newUUID)
      .set(<any>{
        doc: forum.doc,
        subject : forum.subject,
        description: forum.description,
        create_by: '0',
        create_time: forum.create_time,
        update_by: '0',
        update_time: forum.update_time,
        category_id: 'RFOOPU6PwqetYy1piJdm'
      });
  }

  updateForum(forum: ForumModel){
    forum.update_time = new Date();
    return this.collectionForumFirestore
      .doc(forum.doc as string)
      .update(<any>{
        doc: forum.doc,
        subject : forum.subject,
        description: forum.description,
        create_by: forum.create_by,
        create_time: forum.create_time,
        update_by: forum.update_by,
        update_time: forum.update_time,
        category_id: forum.category_id
      });
  }
}
