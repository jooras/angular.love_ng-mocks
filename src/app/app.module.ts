import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SpeedUnitPipe } from './speed-unit.pipe';
import { TemperatureUnitPipe } from './temperature-unit.pipe';

export class Environment {
    public apiUrl: string;
    public system: 'metric' | 'imperial';
}

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        SpeedUnitPipe,
        TemperatureUnitPipe
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
