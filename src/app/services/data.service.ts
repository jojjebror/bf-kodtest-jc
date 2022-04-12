import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/url-enums';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }

  getRedditFeed(entries: number, page: any,) {
    let url = (Constants.filter_url + entries);
    if (page == null || page == '') {
      url = Constants.filter_url + entries;
    }
    else {
      url = (url + '&' + page);
    }

    return this.httpClient.get<any>(url);
  }

  getRedditFeedPost(url: string): Observable<any> {
    console.log(Constants.base_url + url)
    return this.httpClient.get<any>(Constants.base_url + url + '.json')
  }

}
