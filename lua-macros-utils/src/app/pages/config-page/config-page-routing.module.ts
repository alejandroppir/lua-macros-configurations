import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingConstants } from './../../shared/components/Constants';
import { ConfigPageComponent } from './config-page.component';

const routes: Routes = [
 {
  path: RoutingConstants.PATH_EMPTY,
  component: ConfigPageComponent,
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
})
export class ConfigPageRoutingModule {}
