import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MockBuilder } from 'ng-mocks';

import { Environment } from '../../weather-widget/models';
import { WeatherService } from '../../weather-widget/weather.service';
import { WeatherModule } from '../../weather-widget/weather.module';


describe('[REFACTORED] WeatherService', () => {
    function setup() {
		const environment = { apiUrl: 'SAMPLE', system: null };

		const testingModule = MockBuilder(WeatherService, WeatherModule)
			.mock(Environment, environment)
			.build();

		TestBed.configureTestingModule(testingModule);

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
