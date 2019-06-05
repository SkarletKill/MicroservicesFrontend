import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Ad, AdsService} from '../../services';

@Component({
  selector: 'jeva-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsComponent implements OnInit {
  public data$: BehaviorSubject<Ad[]> = null;
  constructor(private service: AdsService) { }

  ngOnInit() {
    this.data$ = this.service.getData();
  }

}
