import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../api/api.service';
import {map} from 'rxjs/operators';
import {Composition} from '../compositions/compositions.service';

export interface Ad {
  id: number;
  title: string;
  text: string;
  composition: Composition;
}

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private fullData: any[] = [];
  private readonly data$: BehaviorSubject<Ad[]> = null;

  constructor(private api: ApiService) {
    this.data$ = new BehaviorSubject(null);
  }

  public getData(): BehaviorSubject<Ad[]> {
    if (this.fullData.length === 0) {
      this.loadData();
    }

    return this.data$;
  }

  public getOne(id: number): Observable<Ad> {
    return this.api.getAd(id).pipe(map(resp => resp.ok ? resp.body : null ));
  }

  public deleteItem(id: number): void {
    this.api.deleteAd(id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.filter((composition) => composition.id !== id);
        this.data$.next(this.fullData);
      }
    });
  }

  public replaceItem(id: number, model: any): void {
    this.api.replaceAd(id, model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.map((composition) => composition.id === id ? res.body : composition);
        this.data$.next(this.fullData);
      }
    });
  }

  public addItem(model: any): void {
    this.api.addAd(model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = [...this.fullData, res.body];
        this.data$.next(this.fullData);
      }
    });
  }

  private loadData(): void {
    this.api.getAds().subscribe((resp) => {
      console.log(resp);
      if (resp.body) {
        this.fullData = resp.body;
        this.data$.next(this.fullData);
      }
    });
  }
}
