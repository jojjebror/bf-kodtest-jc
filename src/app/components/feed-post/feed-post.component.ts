import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit, OnDestroy {
  comments: any = [];
  postData: any = [];
  redditData: any = [];
  bfLogo = 'assets/icons/bannerflow.png';

  private sub: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { url: string, id: string, title: string },
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getRedditPost();
  }

  getRedditPost() {
    this.sub = this.dataService.getRedditPostData(this.data.url)
      .subscribe(result => {
        {
          this.getData(false, result);
          this.getData(true, result);
          console.log('Fetched post successfully')
        }
      },
        error => {
          console.log(error)
        });
  }


  getData(isCommentsData: boolean, redditObj: any[]) {
    let data = null;
    if (!isCommentsData) {
      data = redditObj[0].data.children[0].data;
      this.redditData = data;
      this.postData.push(this.redditData);
    }
    else if (isCommentsData) {
      data = redditObj[1].data.children
      this.comments = data;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
