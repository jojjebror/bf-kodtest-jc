import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/config/url-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }

  getRedditFeed(entries: number, page: any,) {
    let url = (UrlConstants.filter_url + entries);
    if (page == null || page == '') {
      url = UrlConstants.filter_url + entries;
    }
    else {
      url = (url + '&' + page);
    }

    return this.httpClient.get<any>(url);
  }

  getRedditFeedPost(url: string): Observable<any> {
    return this.httpClient.get<any>(UrlConstants.base_url + url + '.json')
  }

}
