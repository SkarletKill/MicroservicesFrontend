import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { News, NewsService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'jeva-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsDetailsComponent implements OnInit {
  public news: News = null;
  public form: FormGroup;
  private newsId = null;

  constructor(
    private service: NewsService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.newsId = parseInt(this.route.snapshot.paramMap.get('term'), 10);
    if (!this.isNew()) {
      this.service.getOne(this.newsId).subscribe((news) => {
        this.news = news;
        this.form.patchValue({
          title: news.title,
          content: news.content,
        });
        this.cdRef.markForCheck();
      });
    }
  }

  public isNew(): boolean {
    return Number.isNaN(this.newsId);
  }

  public submitNews() {
    const value = this.form.value;
    this.form.reset();

    if (this.isNew()) {
      this.service.addItem(value);
    } else {
      this.service.replaceItem(this.newsId, value);
    }

    this.location.back();
  }

  public deleteNews() {
    this.service.deleteItem(this.newsId);
    this.location.back();
  }

}
