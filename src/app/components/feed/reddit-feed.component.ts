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
export class RedditFeedComponent implements OnInit, OnDestroy {

  private sub: Subscription
  entries: number[] = [5, 10, 25];
  entry: number = this.entries[0];
  childDataList: any = [];
  redditFeedData: any = [];
  idNameList: any = [];
  isEmpty: boolean = true;
  error: string;
  dataObj: any;
  pageIdentifier: string;
  bfLogo = 'assets/icons/bannerflow.png';

  constructor(
    public dataService: DataService,
    public dialogRef: MatDialog) {
  }

  ngOnInit() {
    this.getRedditFeed();

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
  gotoNext(type: string) {
    this.idNameList = [];
    for (let data of this.childDataList) {
      this.idNameList.push(data.data.name);
    }
    let last = this.idNameList[this.idNameList.length - 1];
    this.pageIdentifier = (type + last)
    if (this.idNameList != 0) {
      this.isEmpty = false;
    }
    this.getRedditFeed();
  }

  gotoPrevious(type: string) {
    this.idNameList = [];
    for (let data of this.childDataList) {
      this.idNameList.push(data.data.name);
    }
    let first = this.idNameList[0];
    this.pageIdentifier = (type + first)
    if (this.idNameList.length <= 2) {
      this.isEmpty = true;
      this.pageIdentifier = null;
    }
    this.getRedditFeed();
  }

  getRedditFeed() {
    this.childDataList = [];
    this.sub = this.dataService
      .getRedditFeedData(this.entry, this.pageIdentifier)
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
    this.getRedditFeed();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
