import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../api/api.service';
import {Composer} from '../composers/composers.service';
import {map} from 'rxjs/operators';

export interface Composition {
  id: number;
  name: string;
  duration: number;
  composer: Composer;
}

@Injectable({
  providedIn: 'root'
})
export class CompositionsService {
  private fullData: Composition[] = [];
  private readonly data$: BehaviorSubject<Composition[]> = null;

  constructor(private api: ApiService) {
    this.data$ = new BehaviorSubject<Composition[]>([]);
  }

  public getData(): BehaviorSubject<Composition[]> {
    if (this.fullData.length === 0) {
      this.loadData();
    }

    return this.data$;
  }

  public getComposition(id: number): Observable<Composition> {
    return this.api.getComposition(id).pipe(map(resp => resp.ok ? resp.body : null ));
  }

  public deleteComposition(id: number): void {
    this.api.deleteComposition(id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.filter((composition) => composition.id !== id);
        this.data$.next(this.fullData);
      }
    });
  }

  public replaceComposition(id: number, model: any): void {
    this.api.replaceComposition(id, model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.map((composition) => composition.id === id ? res.body : composition);
        this.data$.next(this.fullData);
      }
    });
  }

  public addComposition(model: any): void {
    this.api.addComposition(model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = [...this.fullData, res.body];
        this.data$.next(this.fullData);
      }
    });
  }

  private loadData(): void {
    this.api.getCompositions().subscribe((resp) => {
      console.log(resp);
      if (resp.body) {
        this.fullData = [...resp.body];
        this.data$.next(this.fullData);
      }
    });
  }
}
