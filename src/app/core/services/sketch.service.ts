import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { dataURLtoFile } from '../utils/data-url-file.util.js';

@Injectable({
  providedIn: 'root',
})
export class SketchService {
  collectionName = 'sketches';

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  create(sketch: any): Promise<any> {
    return this.angularFirestore.collection(this.collectionName).add(sketch);
  }

  async uploadSketchThumbnail(thumbnailString: string) {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.angularFireStorage.ref(
      this.collectionName + '/' + randomId
    );
    const task = await ref.put(dataURLtoFile(thumbnailString, 'thumbnail.png'));
    return await task.ref.getDownloadURL();
  }

  getSketch(id: string): Observable<any> {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(map((sketch: any) => ({ ...sketch, id })));
  }

  getAllSketchesByOwnerId(userId: string) {
    return this.angularFirestore
      .collection(this.collectionName, (ref) =>
        ref.where('owner.uid', '==', userId)
      )
      .valueChanges({ idField: 'id' });
  }

  delete(id: string): Promise<any> {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }

  update(sketch: any): Promise<any> {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(sketch.id)
      .set({ ...sketch }, { merge: true });
  }

  getAll(): Observable<any[]> {
    return this.angularFirestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' });
  }
}
