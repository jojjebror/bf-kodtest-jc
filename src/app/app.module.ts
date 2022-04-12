import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatIconModule } from '@angular/material';
import { RedditFeedComponent } from './components/feed/reddit-feed.component';
import { RedditFeedModule } from './components/feed/reddit-feed.module';
import { MatSelectModule } from '@angular/material/select';
import { FeedPostComponent } from './components/feed-post/feed-post.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent, RedditFeedComponent, FeedPostComponent],
  entryComponents: [FeedPostComponent],
  imports: [
    BrowserModule,
    RedditFeedModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
