import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Composer, ComposersService } from '../../services';

@Component({
  selector: 'jeva-composers',
  templateUrl: './composers.component.html',
  styleUrls: ['./composers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposersComponent implements OnInit {
  public data$: BehaviorSubject<Composer[]> = null;

  constructor(private service: ComposersService) { }

  ngOnInit() {
    this.data$ = this.service.getData();
  }
}
