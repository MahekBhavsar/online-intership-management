import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
  UpdateData,
  docData,
  CollectionReference
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { FirebaseCollections } from '../firebase-service/firebase-enums';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly firestore: Firestore) { }

  // public getCollection<T extends DocumentData>(
  //   collectionName: FirebaseCollections
  // ): Observable<T[]> {
  //   const collectionRef = collection(
  //     this.firestore,
  //     collectionName
  //   ) as CollectionReference<T, T>;
  //   return collectionData<T>(collectionRef, { idField: 'id' });
  // }
public getCollection<T extends DocumentData>(
  collectionName: FirebaseCollections
): Observable<T[]> {

  const collectionRef = collection(
    this.firestore,
    collectionName
  );

  return collectionData(collectionRef, {
    idField: 'id'
  }) as Observable<T[]>;
}


  public getDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string
  ): Observable<T | undefined> {
    const collectionRef = collection(
      this.firestore,
      collectionName
    ) as CollectionReference<T, T>;
    const docRef = doc(collectionRef, documentId) as DocumentReference<T, T>;
    return docData<T>(docRef, { idField: 'id' });
  }

  public addDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    document: T
  ): Promise<DocumentReference<T>> {
    const collectionRef = collection(
      this.firestore,
      collectionName
    ) as CollectionReference<T, T>;
    return addDoc(collectionRef, document);
  }

  public updateDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string,
    document: UpdateData<T>
  ): Promise<void> {
    const collectionRef = collection(
      this.firestore,
      collectionName
    ) as CollectionReference<T, T>;
    const docRef = doc(collectionRef, documentId) as DocumentReference<T, T>;
    return updateDoc(docRef, document);
  }

  public deleteDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string
  ): Promise<void> {
    const collectionRef = collection(
      this.firestore,
      collectionName
    ) as CollectionReference<T>;
    const docRef = doc(collectionRef, documentId) as DocumentReference<T>;
    return deleteDoc(docRef);
  }
}