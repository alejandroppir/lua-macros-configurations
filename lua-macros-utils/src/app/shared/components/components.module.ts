import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
 declarations: [],
 imports: [CommonModule, ToolbarModule],
 exports: [ToolbarModule],
})
export class ComponentsModule {}
