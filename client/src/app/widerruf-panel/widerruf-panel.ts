import { Component } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';


@Component({
    selector: 'widerruf-panel',
    templateUrl: 'widerruf-panel.html',
})
export class WiderrufPanel {
    widerrufButtonText = GlobalConstants.widerrufButtonText;
    panelOpenState1 = false;
    panelOpenState2 = false;
    panelOpenState3 = false;
    panelOpenStateToggleText = ["", "Bite aufklappen und lesen"]
}
