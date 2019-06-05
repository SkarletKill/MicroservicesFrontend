import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Composer, ComposersService} from '../../services';
import {ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'jeva-composer-details',
  templateUrl: './composer-details.component.html',
  styleUrls: ['./composer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposerDetailsComponent implements OnInit {
  public composer: Composer = null;
  public form: FormGroup;
  private composerId = null;

  constructor(
    private service: ComposersService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
    this.composerId = parseInt(this.route.snapshot.paramMap.get('term'), 10);
    if (!this.isNew()) {
      this.service.getItem(this.composerId).subscribe((composer) => {
        this.composer = composer;
        this.form.patchValue({
          name: composer.name,
          surname: composer.surname,
        });
        this.cdRef.markForCheck();
      });
    }
  }

  public isNew(): boolean {
    return Number.isNaN(this.composerId);
  }

  public submitComposer() {
    const value = this.form.value;
    this.form.reset();

    if (this.isNew()) {
      this.service.addItem(value);
    } else {
      this.service.replaceItem(this.composerId, value);
    }

    this.location.back();
  }

  public deleteComposer() {
    this.service.deleteItem(this.composerId);
    this.location.back();
  }

}
