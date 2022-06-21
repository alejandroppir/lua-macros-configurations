import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') className = 'darkMode';

  title = 'lua-macros-utils';

  public toggleDarkMode(state: boolean): void {
    const darkClassName = 'darkMode';
    this.className = state ? darkClassName : '';
  }
}
