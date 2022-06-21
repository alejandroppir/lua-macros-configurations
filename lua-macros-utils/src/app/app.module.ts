import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';
import { APP_LANGUAGES } from './shared/components/Constants';

export function translateFactory(translate: TranslateService) {
  return async (): Promise<void> => {
    translate.addLangs(
      Object.values(APP_LANGUAGES).map((value) => value.toString())
    );
    translate.setDefaultLang(APP_LANGUAGES.en_EN);
    translate.use(APP_LANGUAGES.es_ES);
    return new Promise<void>((resolve) => {
      translate.onLangChange.subscribe(() => {
        resolve();
      });
    });
  };
}

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  ComponentsModule,
  FormsModule,
];

export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    imports,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
