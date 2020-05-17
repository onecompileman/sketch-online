import { Injectable } from '@angular/core';
import { SketchService } from '../services/sketch.service';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SketchInfoResolver implements Resolve<any> {
  constructor(private sketchService: SketchService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Observable((observer) => {
      this.sketchService
        .getSketch(route.paramMap.get('id'))
        .subscribe((sketch) => {
          observer.next(sketch);
          observer.complete();
        });
    });
  }
}
