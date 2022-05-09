import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { WeatherModule } from './weather-widget/weather.module';
import { Environment } from './weather-widget/models';


@NgModule({
    imports: [
        CommonModule,
		BrowserModule,
        HttpClientModule,
		WeatherModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: Environment,
            useValue: environment
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
