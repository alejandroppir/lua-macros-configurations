import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingConstants } from './shared/components/Constants';

const routes: Routes = [
  {
    path: RoutingConstants.PATH_HOME,
    loadChildren: () => import('./../app/pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: RoutingConstants.PATH_CONFIG,
    loadChildren: () => import('./../app/pages/config-page/config-page.module').then((m) => m.ConfigPageModule),
  },
  {
    path: RoutingConstants.PATH_MACROS,
    loadChildren: () => import('./../app/pages/macros-page/macros-page.module').then((m) => m.MacrosPageModule),
  },
  {
    path: RoutingConstants.PATH_EMPTY,
    loadChildren: () => import('./../app/pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
