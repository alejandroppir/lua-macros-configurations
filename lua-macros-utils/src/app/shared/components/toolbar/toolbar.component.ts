import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';

import { LSConstants } from '../../../constants/local-storage.constants';
import { RoutingConstants } from '../Constants';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  toggleControl = new FormControl(true);

  @Output() toogleControlChangesEmitter = new EventEmitter<boolean>();

  routeConfig = [RoutingConstants.PATH_HOME, RoutingConstants.PATH_MACROS, RoutingConstants.PATH_CONFIG];
  constructor(private _localStorageService: LocalStorageService) {
    let mode = this._localStorageService.get(LSConstants.LS_DARK_LIGHT_MODE) as boolean;
    if (mode === undefined || mode === null) {
      this._localStorageService.put(LSConstants.LS_DARK_LIGHT_MODE, true);
      mode = true;
    }
    this.toggleControl.setValue(mode);
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((toggleState) => {
      this._localStorageService.put(LSConstants.LS_DARK_LIGHT_MODE, toggleState);
      this.toogleControlChangesEmitter.emit(toggleState);
    });
    // because of ExpressionChangedAfterItHasBeenCheckedError
    timer(10).subscribe(() => {
      this.toogleControlChangesEmitter.emit(this.toggleControl.value);
    });
  }
}
