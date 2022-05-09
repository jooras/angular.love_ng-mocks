import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WeatherService } from './weather.service';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html'
})
export class WeatherWidgetComponent implements OnInit {
	current$ = new BehaviorSubject(null);

	constructor(
		private weather: WeatherService
	) { }

	async ngOnInit() {
		const current = await this.weather.fetchCurrent();
		this.current$.next(current);
	}
}
