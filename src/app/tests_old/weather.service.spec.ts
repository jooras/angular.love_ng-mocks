import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { WeatherService } from '../weather.service';
import { Environment } from '../app.module';

describe('WeatherService', () => {
    function setup() {
        const environment: Environment = { apiUrl: 'SAMPLE', system: null };

        TestBed
            .configureTestingModule({
                providers: [ HttpClient, WeatherService, Environment ]
            })
            .overrideProvider(Environment, {
                useValue: environment
            })
            .overrideProvider(HttpClient, {
                useValue: { get: (...args) => of(null) }
            });

        const httpClient = TestBed.inject(HttpClient);
        const service = TestBed.inject(WeatherService);

        // @ts-ignore
        const httpGet: jest.SpyInstance = jest.spyOn(httpClient, 'get');

        return { environment, httpClient, service, httpGet };
    }

    describe('getCurrent() method', () => {
        it('should call HTTP get method with proper args', (done) => {
            const { service, httpGet, environment } = setup();

            httpGet.mockImplementation((...args) => of({ dataseries: [] }));

            service.getCurrent()
                .subscribe(() => {
                    expect(httpGet).toHaveBeenCalled();
                    expect(httpGet).toHaveBeenCalledWith(environment.apiUrl, { params: service.params });

                    done();
                });
        });

        it('should take first N elements from HTTP response', async (done) => {
            const dataseries = Array.from(Array(10)).map(() => ({}));
            const { service, httpGet } = setup();

            httpGet.mockImplementation((...args) => of({ dataseries }));

            await service.getCurrent()
                .subscribe((response: {}[]) => {
                    expect(response?.length).toEqual(service.daysNumber);

                    done();
                });
        });

        // ... a few more tests here
    });
});
