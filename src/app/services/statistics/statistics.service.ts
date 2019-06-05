import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private fullData: any[] = [];
  private readonly data$: BehaviorSubject<any[]> = null;

  constructor(private api: ApiService) {
    this.data$ = new BehaviorSubject(null);
  }

  public getData(): BehaviorSubject<any> {
    if (this.fullData.length === 0) {
      this.loadData();
    }

    return this.data$;
  }

  private loadData(): void {
    this.api.getStatistics().subscribe((resp) => {
      console.log(resp);
      if (resp.body) {
        this.fullData = resp.body;
        this.data$.next(this.fullData);
      }
    });
  }
}
