import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MockProvider } from 'ng-mocks';

import { Environment } from '../../weather-widget/models';
import { WeatherService } from '../../weather-widget/weather.service';


describe('[BETTER] WeatherService', () => {
    function setup() {
        const environment: Environment = { apiUrl: 'SAMPLE', system: null };

        TestBed
            .configureTestingModule({
                providers: [
					MockProvider(HttpClient),
					MockProvider(Environment, environment),
					WeatherService
				]
            });

        const httpClient = TestBed.inject(HttpClient);
        const service = TestBed.inject(WeatherService);
        const httpGet: jest.SpyInstance = jest.spyOn(httpClient, 'get');

        return { environment, httpClient, service, httpGet };
    }

    describe('getCurrent() method', () => {
        it('should call HTTP get method with proper args', async () => {
            const { service, httpGet, environment } = setup();

            httpGet.mockImplementation((...args) => of({ dataseries: [] }));

            await service.fetchCurrent();

            expect(httpGet).toHaveBeenCalled();
            expect(httpGet).toHaveBeenCalledWith(environment.apiUrl, { params: service.params });
        });

        it('should take first N elements from HTTP response', async () => {
            const dataseries = Array.from(Array(10)).map(() => ({}));
            const { service, httpGet } = setup();

            httpGet.mockImplementation((...args) => of({ dataseries }));

            const response = await service.fetchCurrent();

            expect(response?.length).toEqual(service.daysNumber);

        });

        // ... a few more tests here
    });
});
