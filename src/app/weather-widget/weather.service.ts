import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Environment } from './models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
    readonly daysNumber = 6;
    readonly params = { lon: '19.02', lat: '50.26', unit: 'metric', output: 'json', product: 'civil' };

    constructor(
        private http: HttpClient,
        private environment: Environment
    ) { }

    fetchCurrent(): Promise<any> {
        return this.http
            .get<{ dataseries: any[] }>(
                this.environment.apiUrl,
                { params: this.params }
            )
            .pipe(
                map(result => result.dataseries
                    .slice(0, this.daysNumber)
                    .map(series => this.mapSeries(series))
                )
            )
            .toPromise();
    }

    mapSeries(series) {
        return {
            timePoint: series.timepoint,
            cloudCover: series.cloudcover,
            forecast: series.weather,
            wind: series.wind10m,
            temperature: series.temp2m
        };
    }
}
