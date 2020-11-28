import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { menuList } from './header.model';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription[] = [];
  menuSubscription: Subscription;
  menusLists: any;
  screenMedia: Subscription;
  deviceXs: boolean;

  constructor(private headerservices: HeaderService,
    private screenObserver: MediaObserver) { }

  ngOnInit(): void {
    this.getMenu();
    this.getScreenMedia();
  }

  getScreenMedia() {
    this.screenMedia = this.screenObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }

  getMenu() {
    this.menuSubscription = this.headerservices.getMenu()
    .subscribe((result: any) => {
      this.menusLists = result;
    });

    this.subscription.push(this.menuSubscription);
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

}
