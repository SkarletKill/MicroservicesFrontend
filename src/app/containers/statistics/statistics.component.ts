import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StatisticsService} from '../../services';

@Component({
  selector: 'jeva-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {
  public data$: BehaviorSubject<any>;

  constructor(private service: StatisticsService) { }

  ngOnInit() {
    this.data$ = this.service.getData();
  }
}
