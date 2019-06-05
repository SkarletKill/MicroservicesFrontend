import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {News, NewsService} from '../../services';

@Component({
  selector: 'jeva-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  public data$: BehaviorSubject<News[]> = null;
  constructor(private service: NewsService) { }

  ngOnInit() {
    this.data$ = this.service.getData();
  }

}
