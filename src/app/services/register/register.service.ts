import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/user/userModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private collectionForumName = "/master_users";
  private collectionForumFirestore: AngularFirestoreCollection<UserModel>;

  constructor(private firestore: AngularFirestore) { 
    this.collectionForumFirestore = firestore.collection<UserModel>(this.collectionForumName);
  }

  getAllUser(){
    return this.collectionForumFirestore.valueChanges();
  }

  addUser(user: UserModel){
    var gDoc = this.firestore.createId();
    return this.collectionForumFirestore.doc(gDoc).set({
      doc: gDoc,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      password: user.password,
      username: user.username,
      address: user.address
    }).then(r =>  {
      //console.log(r)
      return true;
    }).catch(e => {
      return false;
    });
  }
}
