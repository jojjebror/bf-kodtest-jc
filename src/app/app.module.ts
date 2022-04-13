import { AppComponent } from './app.component';
import { RedditFeedComponent } from './components/feed/reddit-feed.component';
import { FeedPostComponent } from './components/feed-post/feed-post.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent, RedditFeedComponent, FeedPostComponent],
  entryComponents: [FeedPostComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
