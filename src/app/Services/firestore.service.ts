import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Get all data from a collection
  public getCollection(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  // Get a single document from a collection
  public getDocument(collection: string, document: string): Observable<any> {
    return this.firestore.collection(collection).doc(document).valueChanges();
  }

  // Create a new document in a collection
  public createDocument(collection: string, data: any): void {
    this.firestore.collection(collection).add(data);
  }

  public createUsers(collection: string, data: any): void {
    this.firestore.collection(collection).doc(data.username).set(data);
  }

  public createPatient(collection: string, data: any): void {
    this.firestore.collection(collection).doc(data.id).set(data);
  }

  getCollectionWithWhere(
    collection: string,
    field: string,
    value: string,
    limit: number = 50
  ): Observable<any[]> {
    // order by date and time
    return this.firestore
      .collection(collection, (ref) =>
        ref
          .where(field, '==', value)
          // .orderBy('date', 'desc')
          // .orderBy('time', 'desc')
          .limit(limit)
      )
      .valueChanges();
  }

  async getUser(collection: string, username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(collection)
        .doc(username)
        .get()
        .subscribe((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());

            resolve(doc.data());
          }
          resolve(null);
        });
    });
  }

  updatPatient(patientId: string, data: any): void {
    this.firestore.collection('Patients').doc(patientId).update(data);
  }
  // Update user
  updateUser(collection: string, username: string, data: any): void {
    this.firestore.collection(collection).doc(username).update(data);
  }
}
