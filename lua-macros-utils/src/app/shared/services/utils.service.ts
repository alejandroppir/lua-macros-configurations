import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Observable, take } from 'rxjs';

import { AppInjector } from './../../app.module';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor(
    private _snackBar: MatSnackBar,
    private _translate: TranslateService,
    private _http: HttpClient
  ) {}

  static getService(service: any): any {
    return AppInjector.get<typeof service>(service as typeof service);
  }

  static createService(service: any, args: any[]): any {
    return new service(...args);
  }

  showSnackBar(message: string): void {
    this._snackBar.open(message, this._translate.instant('ACCEPT'), {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  translate(text: string): string {
    return this._translate.instant(text);
  }

  async readAssetsFile(filename: string): Promise<string> {
    return await firstValueFrom(this.readAssetsFileObs(filename));
  }

  readAssetsFileObs(filename: string): Observable<string> {
    return this._http
      .get(`assets/textfiles/${filename}`, { responseType: 'text' })
      .pipe(take(1));
  }
}
