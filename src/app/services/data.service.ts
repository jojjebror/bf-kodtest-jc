import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enum/url-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }

  getRedditFeedData(entries: number, page: string): Observable<any> {
    let url = (UrlConstants.filter_url + entries);
    if (page == undefined) {
      url = UrlConstants.filter_url + entries;
    }
    else {
      url = (url + '&' + page);
    }
    return this.httpClient.get<any>(url);
  }

  getRedditPostData(url: string): Observable<any> {
    return this.httpClient.get<any>(UrlConstants.base_url + url + '.json')
  }
}
