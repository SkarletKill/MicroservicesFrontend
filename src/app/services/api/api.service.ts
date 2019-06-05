import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getCompositions(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/compositions`, { observe: 'response' });
  }

  getComposition(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/composition/${id}`, { observe: 'response' });
  }

  deleteComposition(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.api}/composition/${id}`, { observe: 'response' });
  }

  replaceComposition(id: number, model: any): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.api}/composition/${id}`, model, { observe: 'response' });
  }

  addComposition(model: any): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.api}/compositions`, model, { observe: 'response' });
  }

  getComposers(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/composers`, { observe: 'response' });
  }

  getComposer(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/composer/${id}`, { observe: 'response'});
  }

  deleteComposer(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.api}/composer/${id}`, { observe: 'response'});
  }

  replaceComposer(id: number, model: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.http}/composer/${id}`, model, {observe: 'response'});
  }

  addComposer(model): Observable<HttpResponse<any>>  {
    return this.http.post(`${this.api}/composer`, model, { observe: 'response'});
  }

  getAds(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/ads`, { observe: 'response' });
  }

  getAd(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/ads/${id}`, { observe: 'response'});
  }

  deleteAd(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.api}/ads/${id}`, { observe: 'response'});
  }

  replaceAd(id: number, model: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.api}/ads/${id}`, model, { observe: 'response'});
  }

  addAd(model: any): Observable<HttpResponse<any>>  {
    return this.http.post(`${this.api}/ads`, model, { observe: 'response'});
  }

  getNews(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/news`, { observe: 'response'});
  }

  getOneNews(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/news/${id}`, { observe: 'response'});
  }

  deleteNews(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.api}/news/${id}`, { observe: 'response'});
  }

  replaceNews(id: number, model: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.api}/news/${id}`, model, { observe: 'response'});
  }

  addNews(model: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.api}/news`, model, { observe: 'response'});
  }

  getStatistics(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.api}/statistics`, { observe: 'response' });
  }
}
