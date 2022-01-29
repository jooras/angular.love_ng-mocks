import { Component } from '@angular/core';

import { WeatherService } from './weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    readonly current$ = this.weather.getCurrent();

    constructor(
        public weather: WeatherService
    ) { }
}
