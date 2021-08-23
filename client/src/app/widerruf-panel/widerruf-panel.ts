
import { GlobalConstants } from '../common/global-constants';
import { Component, Input } from '@angular/core';


@Component({
    selector: 'widerruf-panel',
    templateUrl: 'widerruf-panel.html',
})
export class WiderrufPanel {
    @Input()
    widerrufAlternativeText: string = "";

    widerrufButtonText = GlobalConstants.widerrufButtonText;
    panelOpenState1 = false;
    panelOpenState2 = false;
    panelOpenState3 = false;
    // panelOpenStateToggleText = ["", "Bitte aufklappen"]
    panelOpenStateToggleText = ["", ""]
}
