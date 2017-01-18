import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'businessVisa.component.html'
})
export class BusinessVisaComponent implements OnInit {
  private headerVisibleRoutes: Array<string> = ['/business-visas/how-it-works', '/business-visas/list', '/business-visas'];
  private isHeaderVisible: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(state => {
      this.isHeaderVisible = Boolean(this.headerVisibleRoutes.find(path => state.url.endsWith(path)));
    });
  }
}
