import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Composition, CompositionsService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'jeva-composition-details',
  templateUrl: './composition-details.component.html',
  styleUrls: ['./composition-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositionDetailsComponent implements OnInit {
  public composition: Composition;
  public form: FormGroup;
  private compositionId = null;

  constructor(
    private route: ActivatedRoute,
    private service: CompositionsService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      duration: [0, Validators.required],
      composerId: [null, Validators.required],
    });

    this.compositionId = parseInt(this.route.snapshot.paramMap.get('term'), 10);
    if (!this.isNew()) {
      this.service.getComposition(this.compositionId).subscribe((composition) => {
        this.composition = composition;
        this.form.patchValue({
          name: composition.name,
          duration: composition.duration,
          composerId: composition.composer.id,
        });
        this.cdRef.markForCheck();
      });
    }
  }

  public isNew(): boolean {
    return Number.isNaN(this.compositionId);
  }

  public submitComposition(): void {
    const value = this.form.value;
    this.form.reset();

    if (this.isNew()) {
      this.service.addComposition(value);
    } else {
      this.service.replaceComposition(this.compositionId, value);
    }

    this.location.back();
  }

  public deleteComposition(): void {
    this.service.deleteComposition(this.compositionId);
    this.location.back();
  }
}
