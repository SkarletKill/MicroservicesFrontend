import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Ad, AdsService } from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'jeva-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdDetailsComponent implements OnInit {
  public ad: Ad = null;
  public form: FormGroup;
  private adId = null;

  constructor(
    private service: AdsService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      compositionId: ['', Validators.required]
    });
    this.adId = parseInt(this.route.snapshot.paramMap.get('term'), 10);
    if (!this.isNew()) {
      this.service.getOne(this.adId).subscribe((ad) => {
        this.ad = ad;
        this.form.patchValue({
          title: ad.title,
          text: ad.text,
          compositionId: ad.composition.id
        });
        this.cdRef.markForCheck();
      });
    }
  }

  public isNew(): boolean {
    return Number.isNaN(this.adId);
  }

  public submitAd() {
    const value = this.form.value;
    this.form.reset();

    if (this.isNew()) {
      this.service.addItem(value);
    } else {
      this.service.replaceItem(this.adId, value);
    }

    this.location.back();
  }

  public deleteAd() {
    this.service.deleteItem(this.adId);
    this.location.back();
  }

}
