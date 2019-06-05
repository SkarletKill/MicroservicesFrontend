import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { ApiService } from '../api/api.service';
import {map} from 'rxjs/operators';

export interface Composer {
  id: number;
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComposersService {
  private fullData: Composer[] = [];
  private readonly data$: BehaviorSubject<Composer[]> = null;

  constructor(private api: ApiService) {
    this.data$ = new BehaviorSubject<Composer[]>([]);
  }

  public getData(): BehaviorSubject<Composer[]> {
    if (this.fullData.length === 0) {
      this.loadData();
    }

    return this.data$;
  }

  public getItem(id: number): Observable<Composer> {
    return this.api.getComposer(id).pipe(map(resp => resp.ok ? resp.body : null ));
  }

  public deleteItem(id: number): void {
    this.api.deleteComposer(id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.filter((composition) => composition.id !== id);
        this.data$.next(this.fullData);
      }
    });
  }

  public replaceItem(id: number, model: any): void {
    this.api.replaceComposer(id, model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.map((composition) => composition.id === id ? res.body : composition);
        this.data$.next(this.fullData);
      }
    });
  }

  public addItem(model: any): void {
    this.api.addComposer(model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = [...this.fullData, res.body];
        this.data$.next(this.fullData);
      }
    });
  }

  private loadData(): void {
    this.api.getComposers().subscribe((resp) => {
      console.log(resp);
      if (resp.body) {
        this.fullData = [...resp.body];
        this.data$.next(this.fullData);
      }
    });
  }
}
