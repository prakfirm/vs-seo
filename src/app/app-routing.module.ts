import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MarketComponent} from './market/market.component';
import {mainRoutes} from './market/market.routing';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', redirectTo: '/en', pathMatch: 'full'},
      {
        path: ':lang',
        component: MarketComponent,
        data: {
          keywords: 'keywords_main',
          description: 'description_main',
          title: 'site_title'
        },
        children: [...mainRoutes]
      },
    ])
  ],
})
export class AppRoutingModule {}
