import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedPostComponent } from '../feed-post/feed-post.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {

  private sub: Subscription
  entries: number[] = [5, 10, 25];
  entry: number = this.entries[1];
  childDataList: any = [];
  redditFeedData: any = [];
  error: string;
  dataObj: any;
  pageIdentifier: string;
  bfLogo = 'assets/icons/bannerflow.png';

  constructor(
    public dataService: DataService,
    public dialogRef: MatDialog) {
  }

  ngOnInit() {
    this.getRedditFeeds();

  }

  getDialogData(url: string, id: string, title: string) {
    this.dataObj = {
      url: url,
      id: id,
      title: title
    }
    return this.dataObj;
  }

  openDialog() {
    this.dialogRef.open(FeedPostComponent, {
      panelClass: 'modal-dialog-container',
      height: '800px',
      width: '800px',
      data: this.dataObj,
    })
  }

  changePage(type: string, id: string) {
    this.pageIdentifier = (type + '=' + id)
    this.getRedditFeeds();
  }

  getRedditFeeds() {
    this.childDataList = [];
    this.sub = this.dataService
      .getRedditFeed(this.entry, this.pageIdentifier)
      .subscribe(result => {
        {
          this.redditFeedData = result.data;
          for (let children of this.redditFeedData.children) {
            this.childDataList.push(children);
          }
          console.log('Fetched feed successfully');
        }
        error => {
          console.log(error)
        }
      });
  }

  onEntriesChanged(entry: number) {
    this.entry = entry;
    this.getRedditFeeds();
  }
}
