import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';

@NgModule({
 declarations: [VirtualKeyboardComponent],
 imports: [CommonModule, MatButtonModule, MatCardModule],
 exports: [VirtualKeyboardComponent],
})
export class VirtualKeyboardModule {}
