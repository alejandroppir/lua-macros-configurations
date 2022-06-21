import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

import { VirtualKeyboardModule } from './../../shared/components/virtual-keyboard/virtual-keyboard.module';
import { MacrosPageRoutingModule } from './macros-page-routing.module';
import { MacrosPageComponent } from './macros-page.component';

@NgModule({
  declarations: [MacrosPageComponent],
  imports: [
    CommonModule,
    MacrosPageRoutingModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    VirtualKeyboardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    ClipboardModule,
  ],
})
export class MacrosPageModule {}
