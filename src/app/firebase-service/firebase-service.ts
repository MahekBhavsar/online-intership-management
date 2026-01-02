// import { Injectable } from '@angular/core';
//  import {
//    CollectionReference,
//    DocumentData,
//    DocumentReference,
//    Firestore,
//    UpdateData,
//    addDoc,
//    collection,
//    collectionData,
//    deleteDoc,
//    doc,
//    docData,
//    updateDoc,
//  } from '@angular/fire/firestore';
//  import { Observable } from 'rxjs';
//  import { FirebaseCollections } from '../firebase-service/firebase-enums';
 
//  @Injectable({
//    providedIn: 'root',
//  })
//  export class FirebaseService {
//    constructor(private readonly firestore: Firestore) {}
 
//    public getCollection<T extends DocumentData>(
//      collectionName: FirebaseCollections
//    ): Observable<T[]> {
//      const collectionRef = collection(
//        this.firestore,
//        collectionName
//      ) as CollectionReference<T, T>;
//      return collectionData<T>(collectionRef, { idField: 'id' });
//    }
 
//    public getDocument<T extends DocumentData>(
//      collectionName: FirebaseCollections,
//      documentId: string
//    ): Observable<T | undefined> {
//      const collectionRef = collection(
//        this.firestore,
//        collectionName
//      ) as CollectionReference<T, T>;
//      const docRef = doc(collectionRef, documentId) as DocumentReference<T, T>;
//      return docData<T>(docRef, { idField: 'id' });
//    }
 
//    public addDocument<T extends DocumentData>(
//      collectionName: FirebaseCollections,
//      document: T
//    ): Promise<DocumentReference<T>> {
//      const collectionRef = collection(
//        this.firestore,
//        collectionName
//      ) as CollectionReference<T, T>;
//      return addDoc(collectionRef, document);
//    }
 
//    public updateDocument<T extends DocumentData>(
//      collectionName: FirebaseCollections,
//      documentId: string,
//      document: UpdateData<T>
//    ): Promise<void> {
//      const collectionRef = collection(
//        this.firestore,
//        collectionName
//      ) as CollectionReference<T, T>;
//      const docRef = doc(collectionRef, documentId) as DocumentReference<T, T>;
//      return updateDoc(docRef, document);
//    }
 
//    public deleteDocument<T extends DocumentData>(
//      collectionName: FirebaseCollections,
//      documentId: string
//    ): Promise<void> {
//      const collectionRef = collection(
//        this.firestore,
//        collectionName
//      ) as CollectionReference<T>;
//      const docRef = doc(collectionRef, documentId) as DocumentReference<T>;
//      return deleteDoc(docRef);
//    }
//  }

import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  UpdateData,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { FirebaseCollections } from '../firebase-service/firebase-enums';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly firestore: Firestore) {}

  public getCollection<T extends DocumentData>(
    collectionName: FirebaseCollections
  ): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const collectionQuery = query(collectionRef);
    return from(getDocs(collectionQuery)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as T[];
      })
    );
  }

  public getDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string
  ): Observable<T | undefined> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, documentId);
    return from(getDoc(docRef)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          return undefined;
        }
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as unknown as T;
      })
    );
  }

  public addDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    document: T
  ): Promise<DocumentReference<T>> {
    const collectionRef = collection(this.firestore, collectionName) as CollectionReference<
      T,
      DocumentData
    >;
    return addDoc<T, DocumentData>(collectionRef, document);
  }

  public updateDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string,
    document: UpdateData<T>
  ): Promise<void> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, documentId) as DocumentReference<T, DocumentData>;
    return updateDoc(docRef, document);
  }

  public deleteDocument<T extends DocumentData>(
    collectionName: FirebaseCollections,
    documentId: string
  ): Promise<void> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, documentId) as DocumentReference<T, DocumentData>;
    return deleteDoc(docRef);
  }
}
