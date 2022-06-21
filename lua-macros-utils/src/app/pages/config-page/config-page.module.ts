import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { TranslateModule } from '@ngx-translate/core';

import { TableModule } from './../../shared/components/table/table.module';
import { ConfigPageRoutingModule } from './config-page-routing.module';
import { ConfigPageComponent } from './config-page.component';
import { GenerationModule } from './generation/generation.module';

@NgModule({
  declarations: [ConfigPageComponent],
  imports: [
    CommonModule,
    ConfigPageRoutingModule,
    MatCheckboxModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    TableModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MonacoEditorModule,
    GenerationModule,
  ],
})
export class ConfigPageModule {}
