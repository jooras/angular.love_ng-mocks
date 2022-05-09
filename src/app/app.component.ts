import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
		<app-weather-widget></app-weather-widget>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent { }
