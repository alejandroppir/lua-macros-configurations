import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { TranslateModule } from '@ngx-translate/core';

import { GenerationComponent } from './generation.component';

@NgModule({
  declarations: [GenerationComponent],
  imports: [CommonModule, MonacoEditorModule, MatIconModule, TranslateModule, FormsModule, MatButtonModule],
  exports: [GenerationComponent],
})
export class GenerationModule {}
