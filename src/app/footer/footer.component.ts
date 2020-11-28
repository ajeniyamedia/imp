import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  screenMedia: Subscription;
  subscription: Subscription[] = [];
  deviceXs: boolean;

  constructor(private screenObserver: MediaObserver) { }

  ngOnInit(): void {
    this.getScreenMedia();
  }

  getScreenMedia() {
    this.screenMedia = this.screenObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });

    this.subscription.push(this.screenMedia);
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

}
