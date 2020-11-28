import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { menuList } from './header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  menus: menuList[] = [
    {
      name: 'Degree',
      description: 'The degree menu'
    },
    {
      name: 'About',
      description: 'The about menu'
    }
  ];

  constructor(private http: HttpClient) { }
  getMenu() {
    return of(this.menus);
  }


}
