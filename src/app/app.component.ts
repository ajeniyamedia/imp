import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  screenMedia: Subscription;
  deviceXs: boolean;

  constructor(public screenObserver: MediaObserver) { }

  ngOnInit(): void {
    this.screenMedia = this.screenObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }

  ngOnDestory(){
    this.screenMedia.unsubscribe();
  }
}
