import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Composition, CompositionsService} from '../../services';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'jeva-compositions',
  templateUrl: './compositions.component.html',
  styleUrls: ['./compositions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositionsComponent implements OnInit {
  public data$: BehaviorSubject<Composition[]> = null;

  constructor(private service: CompositionsService) { }

  ngOnInit() {
    this.data$ = this.service.getData();
  }
}
