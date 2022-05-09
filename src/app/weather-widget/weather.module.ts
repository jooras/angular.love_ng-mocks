import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WeatherWidgetComponent } from './weather-widget.component';
import { SpeedUnitPipe } from './speed-unit.pipe';
import { TemperatureUnitPipe } from './temperature-unit.pipe';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [
		WeatherWidgetComponent,
		SpeedUnitPipe,
		TemperatureUnitPipe,
	],
	exports: [
		WeatherWidgetComponent,
		SpeedUnitPipe,
		TemperatureUnitPipe,
	]
})
export class WeatherModule { }
