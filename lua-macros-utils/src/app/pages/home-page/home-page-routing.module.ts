import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingConstants } from './../../shared/components/Constants';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: RoutingConstants.PATH_EMPTY,
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
