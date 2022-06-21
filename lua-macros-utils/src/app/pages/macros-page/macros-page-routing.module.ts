import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingConstants } from './../../shared/components/Constants';
import { MacrosPageComponent } from './macros-page.component';

const routes: Routes = [
 {
  path: RoutingConstants.PATH_EMPTY,
  component: MacrosPageComponent,
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
})
export class MacrosPageRoutingModule {}
