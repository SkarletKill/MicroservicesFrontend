import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface News {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private fullData: any[] = [];
  private readonly data$: BehaviorSubject<News[]> = null;

  constructor(private api: ApiService) {
    this.data$ = new BehaviorSubject(null);
  }

  public getData(): BehaviorSubject<News[]> {
    if (this.fullData.length === 0) {
      this.loadData();
    }

    return this.data$;
  }

  public getOne(id: number): Observable<News> {
    return this.api.getOneNews(id).pipe(map(resp => resp.ok ? resp.body : null ));
  }

  public deleteItem(id: number): void {
    this.api.deleteNews(id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.filter((composition) => composition.id !== id);
        this.data$.next(this.fullData);
      }
    });
  }

  public replaceItem(id: number, model: any): void {
    this.api.replaceNews(id, model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = this.fullData.map((composition) => composition.id === id ? res.body : composition);
        this.data$.next(this.fullData);
      }
    });
  }

  public addItem(model: any): void {
    this.api.addNews(model).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.fullData = [...this.fullData, res.body];
        this.data$.next(this.fullData);
      }
    });
  }

  private loadData(): void {
    this.api.getNews().subscribe((resp) => {
      console.log(resp);
      if (resp.body) {
        this.fullData = resp.body;
        this.data$.next(this.fullData);
      }
    });
  }
}
