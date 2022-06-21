import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ToolbarComponent } from './toolbar.component';

const components: (any[] | Type<any>)[] | undefined = [ToolbarComponent];

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    TranslateModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
